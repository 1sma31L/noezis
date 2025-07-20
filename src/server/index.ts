import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./api/root";
import { createTRPCContext } from "./api/trpc";
import { Hono } from "hono";
import { env } from "@/env";
import type { TRPCError } from "@trpc/server";
import { auth } from "@/server/auth";

const app = new Hono().basePath("/api");

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
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

export default app;
