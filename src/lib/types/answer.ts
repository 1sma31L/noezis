import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server";

export type AnswerWithAuthor = inferProcedureOutput<
  AppRouter["content"]["getAnswers"]
>[number];
