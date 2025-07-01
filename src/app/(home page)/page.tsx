import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";
export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
      {/* CARD */}
      <Card className="shadow-4xl absolute top-76 left-72 z-10 flex min-w-96 flex-col items-center justify-center rounded-2xl shadow-2xl">
        <CardHeader className="flex w-full flex-col items-center justify-center gap-2">
          <CardTitle className="text-center text-4xl tracking-tight">
            Discuss, Share, and Connect with{" "}
            <span className="from-primary/90 to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
              Noezis
            </span>
          </CardTitle>
          <CardDescription className="text-md text-center">
            Noezis is a social media platform for the modern age.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-center justify-center gap-4">
          <SignInButton provider="google" />
          <SignInButton provider="github" />
          <div className="text-muted-foreground text-center text-sm">
            or continue to{" "}
          </div>
          <Button
            className="w-full rounded-xl py-6 text-lg"
            size="lg"
            variant="outline"
          >
            <Icon icon="mdi:email" className="mr-2" />
            <Link href="/signup">Sign in with Email</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
          <div className="text-muted-foreground text-center text-xs">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Image
        src="/2001.jpg"
        alt="Hero Picture"
        width={1000}
        height={1000}
        className="absolute top-56 right-80 z-0 rounded-3xl dark:brightness-75"
      />
    </main>
  );
}
