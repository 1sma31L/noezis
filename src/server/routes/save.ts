import { createTRPCRouter, protectedProcedure } from "@/server/lib/trpc";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { save } from "@/server/db/schema";

export const saveRouter = createTRPCRouter({
  savePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { postId } = input;
      const { id: userId } = ctx.session.user;
      const existingSave = await ctx.db.query.save.findFirst({
        where: and(eq(save.contentId, postId), eq(save.userId, userId)),
      });
      if (existingSave) {
        await ctx.db.delete(save).where(eq(save.id, existingSave.id));
      } else {
        await ctx.db.insert(save).values({
          id: crypto.randomUUID(),
          contentId: postId,
          userId,
        });
      }
      return { success: true };
    }),
  getSaveStatus: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { postId } = input;
      const { id: userId } = ctx.session.user;
      const existingSave = await ctx.db.query.save.findFirst({
        where: and(eq(save.contentId, postId), eq(save.userId, userId)),
      });
      return { isSaved: !!existingSave };
    }),
});
