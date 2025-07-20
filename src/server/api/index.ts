import { userRouter } from "@/server/api/routes/user";
import { createCallerFactory, createTRPCRouter } from "@/server/lib/trpc";
import { postRouter } from "@/server/api/routes/post";
import { reactionRouter } from "@/server/api/routes/reaction";
import { shareRouter } from "@/server/api/routes/share";
import { saveRouter } from "@/server/api/routes/save";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  reaction: reactionRouter,
  share: shareRouter,
  save: saveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
