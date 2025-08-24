import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/lib/trpc";
import { post } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";

const postInsertSchema = createInsertSchema(post);

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.post.findMany({
      orderBy: [desc(post.createdAt)],
      with: {
        author: {
          with: {
            user: true,
          },
        },
      },
    });
    return posts;
  }),
  createPost: protectedProcedure
    .input(
      postInsertSchema.omit({
        id: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newPost = await ctx.db.insert(post).values({
        ...input,
        authorId: ctx.session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newPost;
    }),

  getPublicPostsOfUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.query.post.findMany({
        where: eq(post.authorId, input.userId),
        with: {
          author: {
            with: {
              user: true,
            },
          },
        },
        orderBy: [desc(post.createdAt)],
      });
      return posts;
    }),

  getPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const myPost = await ctx.db.query.post.findFirst({
        where: eq(post.id, id),
        with: {
          author: {
            with: {
              user: true,
            },
          },
        },
      });
      return myPost;
    }),
});
