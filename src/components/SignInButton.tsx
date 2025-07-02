"use client";
import React from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { signInWithProvider } from "@/utils/auth";
type Provider = "google" | "github";
function SignInButton({ provider }: { provider: Provider }) {
  return (
    <Button
      className="w-full cursor-pointer rounded-xl py-6"
      size={"sm"}
      onClick={() => signInWithProvider(provider)}
    >
      <Icon icon={`mdi:${provider}`} className="mr-2" />
      Sign in with {provider}
    </Button>
  );
}

export default SignInButton;
