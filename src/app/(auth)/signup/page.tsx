"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { signInWithProvider } from "@/utils/auth";

export default function SignUp() {
  return (
    <main className="bg-background flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold">Create Account</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-black text-white hover:bg-black/90 hover:text-white"
              onClick={() => signInWithProvider("github")}
            >
              <Icon icon="mdi:github" width="24" height="24" />
              Continue with GitHub
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => signInWithProvider("google")}
            >
              <Icon icon="logos:google-icon" width="24" height="24" />
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground px-2">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Full Name
              </label>
              <Input type="text" id="name" placeholder="Enter your full name" />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Choose a password"
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground w-full text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
