import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../lib/trpc";
import { post, reaction } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";

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
        id: crypto.randomUUID(),
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
});
