import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server";

export type QuickTakeWithAuthor = inferProcedureOutput<
  AppRouter["content"]["getQuickTakesOfUser"]
>[number];
