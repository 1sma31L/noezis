import { createCallerFactory, createTRPCRouter } from "@/server/lib/trpc";
import { reactionRouter } from "@/server/routes/reaction";
import { userRouter } from "@/server/routes/user";
import { shareRouter } from "@/server/routes/share";
import { postRouter } from "@/server/routes/post";
import { saveRouter } from "@/server/routes/save";
import { createTRPCContext } from "@/server/lib/trpc";
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "@/server/lib/auth";
import { env } from "@/env";
import type { TRPCError } from "@trpc/server";
import { contentRouter } from "@/server/routes/content";
import { feedRouter } from "@/server/routes/feed";

const app = new Hono().basePath("/api");

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  reaction: reactionRouter,
  share: shareRouter,
  save: saveRouter,
  content: contentRouter,
  feed: feedRouter,
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    // to correct the path stripping
    endpoint: "/api/trpc",
    createContext: (_opts, context) => {
      return createTRPCContext({ headers: context.req.raw.headers });
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }: { path: string | undefined; error: TRPCError }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  }),
);

app.get("/", (c) => {
  return c.text("OK");
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

export default app;
