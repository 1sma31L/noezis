import { createTRPCRouter, protectedProcedure } from "../trpc";
import { post } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";

const postInsertSchema = createInsertSchema(post);

export const postRouter = createTRPCRouter({
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
});
