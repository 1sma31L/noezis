import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server";

export type QuestionWithAuthor = inferProcedureOutput<
  AppRouter["content"]["getQuestions"]
>[number];
