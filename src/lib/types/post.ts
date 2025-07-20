import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server";

export type PostWithAuthor = inferProcedureOutput<
  AppRouter["post"]["getPublicPostsOfUser"]
>[number];
