import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto as Crypto;


const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production" // set `Secure` flag in HTTPS
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// ...
			// don't expose the secret
			// rather expose whether if the user has setup 2fa
			setupTwoFactor: attributes.two_factor_secret !== null,
            username: attributes.username,
            email: attributes.email,
            phoneNumber: attributes.phoneNumber,
            country: attributes.country,
            emailConfirmed: attributes.emailConfirmed
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			two_factor_secret: string | null;
            username: string;
            email: string;
            phoneNumber: string | null;
            emailConfirmed: boolean;
            country: string;
		};
	}
}
