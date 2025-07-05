import { signIn } from "@/lib/clients/auth-client";

export const signInWithProvider = async (provider: "github" | "google") => {
  try {
    await signIn.social({
      provider,
    });
  } catch (error) {
    console.error(`${provider} sign-in failed:`, error);
  }
};
