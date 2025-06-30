import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { profiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.username, input.username),
        with: {
          user: true,
        },
      });

      if (!profile) {
        throw new Error("User not found");
      }

      return profile;
    }),

  getProfileByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.userId, input.userId),
        with: {
          user: true,
        },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      return profile;
    }),
});
