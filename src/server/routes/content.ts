import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/lib/trpc";
import { z } from "zod";
import { quickTake, question, answer } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

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
  getQuickTakes: publicProcedure.query(async ({ ctx }) => {
    const quickTakes = await ctx.db.query.quickTake.findMany({
      where: eq(quickTake.isDeleted, false),
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
  createQuestion: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        tags: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { title, content, tags } = input;
      const [newQuestion] = await ctx.db
        .insert(question)
        .values({
          authorId: ctx.session?.user?.id,
          title,
          content,
          tags,
        })
        .returning();
      return newQuestion;
    }),
  getQuestions: publicProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.query.question.findMany({
      where: eq(question.isDeleted, false),
      with: {
        author: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(question.createdAt)],
    });
    return questions;
  }),
  getQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const myQuestion = await ctx.db.query.question.findFirst({
        where: eq(question.id, id),
        with: {
          author: {
            with: {
              user: true,
            },
          },
        },
      });
      return myQuestion;
    }),
  createAnswer: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        content: z.string(),
        tags: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { questionId, content, tags } = input;
      const [newAnswer] = await ctx.db
        .insert(answer)
        .values({
          questionId,
          authorId: ctx.session?.user?.id,
          content,
          tags,
        })
        .returning();
      return newAnswer;
    }),
  getAnswers: publicProcedure.query(async ({ ctx }) => {
    const answers = await ctx.db.query.answer.findMany({
      where: eq(answer.isDeleted, false),
      with: {
        author: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(answer.createdAt)],
    });
    return answers;
  }),
});
