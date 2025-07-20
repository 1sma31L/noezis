import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server";

export type ProfileWithUser = inferProcedureOutput<
  AppRouter["user"]["getProfileByUsername"]
>;
