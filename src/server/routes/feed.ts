import { createTRPCRouter, publicProcedure } from "@/server/lib/trpc";

export const feedRouter = createTRPCRouter({
  getFeed: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.post.findMany();
    const quickTakes = await ctx.db.query.quickTake.findMany();
    // const questions = await ctx.db.query.question.findMany();
    // const answers = await ctx.db.query.answer.findMany();
    const feed = [...posts, ...quickTakes];
    const sortedFeed = feed.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedFeed;
  }),
});
