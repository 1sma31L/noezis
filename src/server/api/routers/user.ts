import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { profile } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getProfileByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const userProfile = await ctx.db.query.profile.findFirst({
        where: eq(profile.username, input.username),
        with: {
          user: true,
        },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      return userProfile;
    }),

  getProfileByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userProfile = await ctx.db.query.profile.findFirst({
        where: eq(profile.userId, input.userId),
        with: {
          user: true,
        },
      });

      if (!userProfile) {
        throw new Error("Profile not found");
      }

      return userProfile;
    }),
});
