import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/lib/trpc";
import { reaction } from "@/server/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

export const reactionRouter = createTRPCRouter({
  toggleReaction: protectedProcedure
    .input(
      z.object({
        contentId: z.string(),
        contentType: z.enum(["post", "quickTake", "answer", "question"]),
        type: z.enum(["like", "dislike"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { contentId, contentType, type } = input;
      const { id: userId } = ctx.session.user;

      // Use a transaction to ensure data consistency
      return await ctx.db.transaction(async (tx) => {
        const existingReaction = await tx.query.reaction.findFirst({
          where: and(
            eq(reaction.contentId, contentId),
            eq(reaction.contentType, contentType),
            eq(reaction.userId, userId),
          ),
        });

        if (existingReaction) {
          // If same reaction type, remove it (toggle off)
          if (existingReaction.type === type) {
            await tx
              .delete(reaction)
              .where(
                and(
                  eq(reaction.contentId, contentId),
                  eq(reaction.contentType, contentType),
                  eq(reaction.userId, userId),
                ),
              );
            return { success: true, action: "removed" };
          }

          // If different reaction type, update it
          await tx
            .update(reaction)
            .set({
              type,
              updatedAt: new Date(),
            })
            .where(
              and(
                eq(reaction.contentId, contentId),
                eq(reaction.contentType, contentType),
                eq(reaction.userId, userId),
              ),
            );
          return { success: true, action: "updated" };
        }

        // No existing reaction, create new one
        await tx.insert(reaction).values({
          id: crypto.randomUUID(),
          contentId,
          contentType,
          type,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return { success: true, action: "added" };
      });
    }),

  getReactionStatus: publicProcedure
    .input(
      z.object({
        contentId: z.string(),
        contentType: z.enum(["post", "quickTake", "answer", "question"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { contentId, contentType } = input;
      const { id: userId } = ctx.session?.user ?? { id: "" };

      const existingReaction = await ctx.db.query.reaction.findFirst({
        where: and(
          eq(reaction.contentId, contentId),
          eq(reaction.contentType, contentType),
          eq(reaction.userId, userId),
        ),
      });

      return {
        hasReacted: !!existingReaction,
        reactionType: existingReaction?.type ?? null,
      };
    }),

  getReactionCounts: publicProcedure
    .input(
      z.object({
        contentId: z.string(),
        contentType: z.enum(["post", "quickTake", "answer", "question"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { contentId, contentType } = input;

      const likes = await ctx.db.query.reaction.findMany({
        where: and(
          eq(reaction.contentId, contentId),
          eq(reaction.contentType, contentType),
          eq(reaction.type, "like"),
        ),
      });
      const dislikes = await ctx.db.query.reaction.findMany({
        where: and(
          eq(reaction.contentId, contentId),
          eq(reaction.contentType, contentType),
          eq(reaction.type, "dislike"),
        ),
      });

      return { likes: likes.length, dislikes: dislikes.length };
    }),
});
