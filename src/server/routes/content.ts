import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/lib/trpc";
import { z } from "zod";
import { quickTake } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { desc } from "drizzle-orm";

export const contentRouter = createTRPCRouter({
  createQuickTake: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        tags: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { content, tags } = input;
      const [newQuickTake] = await ctx.db
        .insert(quickTake)
        .values({
          authorId: ctx.session?.user?.id,
          content,
          tags,
        })
        .returning();
      return newQuickTake;
    }),
  getQuickTakesOfUser: publicProcedure.query(async ({ ctx }) => {
    const quickTakes = await ctx.db.query.quickTake.findMany({
      with: {
        author: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(quickTake.createdAt)],
    });
    return quickTakes;
  }),
});
