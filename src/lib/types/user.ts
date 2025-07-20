import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@/server/api";

export type ProfileWithUser = inferProcedureOutput<
  AppRouter["user"]["getProfileByUsername"]
>;
