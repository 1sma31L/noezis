import { handle } from "hono/vercel";

// eslint-disable-next-line import/no-unresolved
// @ts-ignore
import app from "../dist/index.js";

console.log(app);

export const config = {
	runtime: "nodejs",
};

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
export const HEAD = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
