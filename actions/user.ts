"use server"

import { loginValidator, signupValidator } from "@/lib/validations"
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { verify } from "@node-rs/argon2";
import { validateRequest } from "@/data/user";

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

        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (err: any){
        return {
            message: "Ett oväntat fel uppstod"
        }
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
