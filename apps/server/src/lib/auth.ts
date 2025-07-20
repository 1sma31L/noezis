import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { profile } from "../db/schema";

console.log("CORS_ORIGIN", process.env.CORS_ORIGIN);
console.log("BETTER_AUTH_URL", process.env.BETTER_AUTH_URL);
console.log("BETTER_AUTH_SECRET", process.env.BETTER_AUTH_SECRET);
console.log("GITHUB_CLIENT_ID", process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CLIENT_SECRET", process.env.GITHUB_CLIENT_SECRET);
console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	baseURL: process.env.BETTER_AUTH_URL!,
	secret: process.env.BETTER_AUTH_SECRET!,
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	advanced: {
		cookiePrefix: "noezis",
		defaultCookieAttributes: {
			sameSite: "none",
			httpOnly: true,
			secure: true,
		},
	},
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					const nameParts = user.name.split(" ");
					const baseUsername = nameParts[0]?.toLowerCase();
					const randomSuffix = Math.floor(Math.random() * 10000);
					const username = `${baseUsername}${randomSuffix}`;

					await db.insert(profile).values({
						userId: user.id,
						username: username,
					});
				},
			},
		},
	},
});

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
