import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

export type PostWithAuthor = inferProcedureOutput<
  AppRouter["post"]["getPublicPostsOfUser"]
>[number];
