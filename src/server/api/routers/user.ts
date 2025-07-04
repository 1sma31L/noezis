import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { profile, user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { updateProfileSchema } from "@/lib/schemas/user";

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
  /**
   * Update a profile
   * @param profile - The profile to update
   * @returns The updated profile
   * @example
   * const updatedProfile = await api.user.updateProfile({
   *   name: "John Doe",
   *   image: "https://example.com/image.jpg",
   *   bio: "I am a software engineer",
   *   location: "New York, NY",
   *   website: "https://example.com",
   *   bannerImage: "https://example.com/banner.jpg",
   * });
   */
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db
        .update(user)
        .set({
          name: input.name,
          image: input.image,
        })
        .where(eq(user.id, ctx.session.user.id));

      const updatedProfile = await ctx.db
        .update(profile)
        .set({
          bio: input.bio,
          location: input.location,
          website: input.website,
          bannerImage: input.bannerImage,
        })
        .where(eq(profile.userId, ctx.session.user.id));

      return updatedProfile;
    }),
});
