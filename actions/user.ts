"use server"

import { loginValidator, signupValidator } from "@/lib/validations"
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { confirmEmailTable, twoFactorKeyTable, userTable } from "@/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gte, sql } from "drizzle-orm";
import { verify } from "@node-rs/argon2";
import { validateRequest } from "@/data/user";
import type { User } from "lucia"
import { renderAsync } from "@react-email/render";
import { createTransport } from "nodemailer";
import EmailConfirmation from "@/emails/confirm-email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { decodeHex, encodeHex } from "oslo/encoding";
import { TOTPController, createTOTPKeyURI } from "oslo/otp";
import QRCode from "qrcode"

export async function RegisterAccount(_:any, formData: FormData) {
    const username = formData.get("username")
    const email = formData.get("mail")
    const displayName = formData.get("displayName")
    const country = formData.get("country")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmpassword")

    const parse = await signupValidator.safeParseAsync({
        username,
        email,
        displayName,
        country,
        password
    })

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors
        return {
            error
        }
    }

    if (password != confirmPassword) {
        return {
            confirmPassword: "Lösenorden matchar inte"
        }
    }

    const passwordHash = await hash(parse.data.password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	try {
		await db.insert(userTable).values({
            id: userId,
            username: parse.data.username.toLocaleLowerCase(),
            email: parse.data.email,
            displayName: parse.data.displayName,
            country: parse.data.country,
            hashedPassword: passwordHash
        })
	} catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") {
            return {
                username: "Detta användarnamn används redan"
            }
        }
		return {
            message: "Ett oväntat fel uppstod"
        }
	}

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    redirect("/");
}

export async function Login(_:any, formData: FormData) {
    const username = formData.get("username")
    const password = formData.get("password")
    let twoFactor = false

    const parse = await loginValidator.safeParseAsync({
        username,
        password
    })

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors
        return {
            error
        }
    }

    try     {
        const existingUser = await db.select().from(userTable).where(eq(userTable.username, parse.data.username.toLocaleLowerCase()))
        if (existingUser.length === 0) {
            return {
                message: "Fel användarnamn eller lösenord"
            }
        }

        const validPassword = await verify(existingUser[0].hashedPassword, parse.data.password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return {
                message: "Fel användarnamn eller lösenord"
            };
        }

        if (existingUser[0].twoFactorSecret) {
            const key = generateRandomString(255, alphabet("A-Z", "a-z", "0-9"))
            await db.insert(twoFactorKeyTable)
            .values({
                id: key,
                userId: existingUser[0].id,
                expiresAt: new Date(new Date().getTime() + 30 * 60000)
            })

            cookies().set("loginVerificationKey", key, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 1000 * 60 * 30 })
            twoFactor = true
        } else {
            const session = await lucia.createSession(existingUser[0].id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (err: any){
        return {
            message: "Ett oväntat fel uppstod"
        }
    }
    if (twoFactor) {
        return redirect("/two-factor-auth")
    }
    return redirect("/");
}

export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

export async function sendEmailConfirmation() {
    const { user } = await validateRequest()

    if (!user) {
        return {
            message: "Unauthorized"
        }
    }

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const key = generateRandomString(8, alphabet("0-9"));

    await db.insert(confirmEmailTable).values({
        userId: user.id,
        code: key,
        expiresAt: new Date(new Date().getTime() + 30 * 60000)
    })

    try {
        const emailHtml = await renderAsync(EmailConfirmation({key}));

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Heet email confirmation",
            html: emailHtml,
        });
    }
    catch (err: any) {
        return {
            message: "Ett oväntat fel uppstod"
        }
    }
    redirect("/activate-two-factor-auth")
}

export async function addTwoFactorAuth(_:any, formData: FormData) {
    const code = formData.get("code")?.toString()

    if (code?.length != 8) {
        return {
            message: "Ogiltig kod"
        }
    }

    const { user } = await validateRequest()

    if (!user) {
        return {
            message: "Unauthorized"
        }
    }

    const correctCode = await verifyVerificationCode(user, code)

    if (!correctCode) {
        return {
            message: "Fel kod se till att det är samma kod som i ditt mail"
        }
    }

    const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));

    try {
        await db.update(userTable).set({
            twoFactorSecret: encodeHex(twoFactorSecret),
            emailConfirmed: true
        }).where(eq(userTable.id, user.id))

        const uri = createTOTPKeyURI("heet", user.username, twoFactorSecret)
        const qrCode = await QRCode.toDataURL(uri, { margin: 2 })
        return {
            qrCode: qrCode
        }
    } catch (err: any) {
        return {
            message: "Ett oväntat fel uppstod"
        }
    }
}

export async function verifyTwoFactorAuth(_:any, formData: FormData) {
    const authKey = cookies().get("loginVerificationKey")?.value
    if (!authKey) {
        redirect("/login")
    }
    const code = formData.get("code")?.toString()

    if (code?.length != 6) {
        return {
            message: "Ogiltig kod"
        }
    }

    try {
        const user = await db.select().from(userTable).where(sql`${userTable.id} IN (SELECT ${twoFactorKeyTable.userId} FROM ${twoFactorKeyTable} WHERE ${twoFactorKeyTable.id} = ${authKey} AND ${twoFactorKeyTable.expiresAt} < ${new Date()})`);
        if (user.length === 0) {
            return {
                message: "Ingen aktiv inloggning hittades, logga in igen"
            }
        }
        
        if (!user[0].twoFactorSecret) {
            return {
                message: "Ett oväntat fel uppstod"
            }
        }
        const validOTP = await new TOTPController().verify(code, decodeHex(user[0].twoFactorSecret));
        if (!validOTP) {
            return {
                message: "Fel kod verifiera koden och testa igen"
            }
        }

        const session = await lucia.createSession(user[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (err: any) {
        return {
            message: "Ett oväntat fel uppstod"
        }
    }
    redirect("/")
}

async function verifyVerificationCode(user: User, code: string) {
	const existingCode = await db.select().from(confirmEmailTable).where(and(eq(confirmEmailTable.userId, user.id), gte(confirmEmailTable.expiresAt, new Date())))
    if (existingCode.length === 0) {
        return false
    }
	if (existingCode[0].code !== code) {
		return false
	}
	return true
}

