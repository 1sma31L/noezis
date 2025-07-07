"use client";
import React from "react";
import { Button } from "../ui/button";
import { signInWithProvider } from "@/lib/helpers/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";
type Provider = "google" | "github";
function SignInButton({ provider }: { provider: Provider }) {
  return (
    <Button
      className="w-full cursor-pointer rounded-xl py-6"
      size={"sm"}
      onClick={() => signInWithProvider(provider)}
    >
      {provider === "github" ? (
        <FaGithub className="mr-2" />
      ) : (
        <FaGoogle className="mr-2" />
      )}
      Sign in with {provider}
    </Button>
  );
}

export default SignInButton;
