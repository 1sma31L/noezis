import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./root";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createTRPCContext } from "./lib/trpc";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowHeaders: [
			"Content-Type",
			"Authorization",
			"trpc-accept",
			"trpc-batch-mode",
			"x-trpc-source",
		],
		allowMethods: ["POST", "GET", "OPTIONS"],
		credentials: true,
	})
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createTRPCContext({ headers: context.req.raw.headers });
		},
	})
);

app.get("/", (c) => {
	return c.text("OK");
});

export default app;
