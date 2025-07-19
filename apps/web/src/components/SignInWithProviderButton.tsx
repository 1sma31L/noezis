"use client";
import { Button } from "./ui/button";
import { signInWithProvider } from "@/lib/helpers/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";

const providers = [
  {
    provider: "github",
    icon: <FaGithub />,
    label: "Continue with GitHub",
    color: "bg-black text-white hover:bg-black/90 hover:text-white",
  },
  {
    provider: "google",
    icon: <FaGoogle />,
    label: "Continue with Google",
    color:
      "bg-background text-foreground hover:bg-background/90 hover:text-foreground",
  },
] as const;

export type Provider = (typeof providers)[number]["provider"];

export default function SignInWithProviderButton({
  provider,
}: {
  provider: Provider;
}) {
  return (
    <Button
      variant="outline"
      size={"lg"}
      className={`w-full cursor-pointer rounded-lg ${providers.find((p) => p.provider === provider)?.color}`}
      onClick={() => signInWithProvider(provider)}
    >
      {providers.find((p) => p.provider === provider)?.icon}
      {providers.find((p) => p.provider === provider)?.label}
    </Button>
  );
}
