import { userRouter } from "./routers/user";
import { createCallerFactory, createTRPCRouter } from "./lib/trpc";
import { postRouter } from "./routers/post";
import { reactionRouter } from "./routers/reaction";
import { shareRouter } from "./routers/share";
import { saveRouter } from "./routers/save";
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
