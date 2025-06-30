"use client";
import React from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";
type Provider = "google" | "github";
function SignInButton({ provider }: { provider: Provider }) {
  const handleSignIn = async () => {
    await signIn(provider);
  };
  return (
    <Button
      className="w-full cursor-pointer rounded-xl py-6 text-lg"
      size="lg"
      onClick={handleSignIn}
    >
      <Icon icon={`mdi:${provider}`} className="mr-2" />
      Sign in with {provider}
    </Button>
  );
}

export default SignInButton;
