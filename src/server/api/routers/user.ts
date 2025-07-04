import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { profile } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  /**
   * Get a profile by username
   * @param username - The username of the profile to get
   * @returns The profile with the user
   * @example
   * const profile = await api.user.getProfileByUsername({ username: "john_doe" });
   */
  getProfileByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileWithUser = await ctx.db.query.profile.findFirst({
        where: eq(profile.username, input.username),
        with: {
          user: true,
        },
      });

      if (!profileWithUser) {
        throw new Error("User not found");
      }

      return profileWithUser;
    }),

  /**
   * Get a profile by user id
   * @param userId - The id of the user to get the profile for
   * @returns The profile with the user
   * @example
   * const profile = await api.user.getProfileByUserId({ userId: "123" });
   */
  getProfileByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileWithUser = await ctx.db.query.profile.findFirst({
        where: eq(profile.userId, input.userId),
        with: {
          user: true,
        },
      });

      if (!profileWithUser) {
        throw new Error("Profile not found");
      }

      return profileWithUser;
    }),
});
