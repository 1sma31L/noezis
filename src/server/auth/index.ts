import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { env } from "@/env";
import { profile } from "@/server/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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
