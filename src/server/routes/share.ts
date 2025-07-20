import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/lib/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { post } from "@/server/db/schema";

export const shareRouter = createTRPCRouter({
  sharePost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { postId } = input;
      const foundPost = await ctx.db.query.post.findFirst({
        where: eq(post.id, postId),
      });
      if (!foundPost) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      await ctx.db
        .update(post)
        .set({
          shares: foundPost.shares + 1,
        })
        .where(eq(post.id, postId));
      return { success: true };
    }),
});
