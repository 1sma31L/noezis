import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/lib/trpc";
import { z } from "zod";
import { quickTake, question, answer, comment, post } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq, and, sql } from "drizzle-orm";

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
  getQuickTake: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const myQuickTake = await ctx.db.query.quickTake.findFirst({
        where: eq(quickTake.id, id),
        with: {
          author: {
            with: {
              user: true,
            },
          },
        },
      });
      return myQuickTake;
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
  getAnswer: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const myAnswer = await ctx.db.query.answer.findFirst({
        where: eq(answer.id, id),
        with: {
          author: {
            with: {
              user: true,
            },
          },
          question: true,
        },
      });
      return myAnswer;
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

  // Comment procedures
  createComment: protectedProcedure
    .input(
      z.object({
        contentType: z.enum(["post", "question", "answer", "quickTake"]),
        contentId: z.string(),
        content: z.string().min(1),
        parentCommentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Use transaction to ensure comment creation and count update are atomic
      const result = await ctx.db.transaction(async (tx) => {
        const [newComment] = await tx
          .insert(comment)
          .values({
            authorId: ctx.session.user.id,
            contentType: input.contentType,
            contentId: input.contentId,
            content: input.content,
            parentCommentId: input.parentCommentId,
          })
          .returning();

        // Increment comment count for all comments (including replies)
        switch (input.contentType) {
          case "post":
            await tx
              .update(post)
              .set({ comments: sql`${post.comments} + 1` })
              .where(eq(post.id, input.contentId));
            break;
          case "question":
            await tx
              .update(question)
              .set({ comments: sql`${question.comments} + 1` })
              .where(eq(question.id, input.contentId));
            break;
          case "answer":
            await tx
              .update(answer)
              .set({ comments: sql`${answer.comments} + 1` })
              .where(eq(answer.id, input.contentId));
            break;
          case "quickTake":
            await tx
              .update(quickTake)
              .set({ comments: sql`${quickTake.comments} + 1` })
              .where(eq(quickTake.id, input.contentId));
            break;
        }

        return newComment;
      });

      return result;
    }),

  getComments: publicProcedure
    .input(
      z.object({
        contentType: z.enum(["post", "question", "answer", "quickTake"]),
        contentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Get all comments for this content
      const allComments = await ctx.db.query.comment.findMany({
        where: and(
          eq(comment.contentType, input.contentType),
          eq(comment.contentId, input.contentId),
          eq(comment.isDeleted, false),
        ),
        with: {
          author: {
            with: {
              user: true,
            },
          },
        },
        orderBy: [desc(comment.createdAt)],
      });

      // Build tree structure with infinite nesting
      const buildCommentTree = (
        parentId: string | null,
      ): typeof allComments => {
        return allComments
          .filter((c) => c.parentCommentId === parentId)
          .map((comment) => ({
            ...comment,
            replies: buildCommentTree(comment.id),
          }));
      };

      return buildCommentTree(null);
    }),

  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const commentToDelete = await ctx.db.query.comment.findFirst({
        where: eq(comment.id, input.commentId),
      });

      if (!commentToDelete) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      if (commentToDelete.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own comments",
        });
      }

      // Use transaction to ensure comment deletion and count update are atomic
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(comment)
          .set({ isDeleted: true })
          .where(eq(comment.id, input.commentId));

        // Decrement comment count for all comments (including replies)
        switch (commentToDelete.contentType) {
          case "post":
            await tx
              .update(post)
              .set({ comments: sql`${post.comments} - 1` })
              .where(eq(post.id, commentToDelete.contentId));
            break;
          case "question":
            await tx
              .update(question)
              .set({ comments: sql`${question.comments} - 1` })
              .where(eq(question.id, commentToDelete.contentId));
            break;
          case "answer":
            await tx
              .update(answer)
              .set({ comments: sql`${answer.comments} - 1` })
              .where(eq(answer.id, commentToDelete.contentId));
            break;
          case "quickTake":
            await tx
              .update(quickTake)
              .set({ comments: sql`${quickTake.comments} - 1` })
              .where(eq(quickTake.id, commentToDelete.contentId));
            break;
        }
      });

      return { success: true };
    }),
});
