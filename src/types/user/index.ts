import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

/**
 * associated with getProfileByUsername
 */
type GetUserInput = inferProcedureInput<
  AppRouter["user"]["getProfileByUsername"]
>;

/**
 * associated with getProfileByUsername
 */
type GetUserOutput = inferProcedureOutput<
  AppRouter["user"]["getProfileByUsername"]
>;

export type UserWithProfile = GetUserOutput;
