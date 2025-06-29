"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { api } from "@/trpc/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { data: session, status } = useSession();
  const [imageError, setImageError] = useState(false);

  // Public query - available to all users
  const hello = api.test.hello.useQuery({ text: "TRPC" });

  // Protected query - only available when logged in
  const secretMessage = api.test.getSecretMessage.useQuery(undefined, {
    enabled: !!session, // Only run query when session exists
  });

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <main className="bg-background relative min-h-screen px-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-lg space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
              Noezis
            </h1>
            <p className="text-muted-foreground text-lg">
              Social media for the modern age
            </p>
          </div>

          {/* TRPC Query Results */}
          <Card className="bg-muted/50 border-none shadow-none">
            <CardContent className="space-y-2 p-4 text-center">
              <p className="text-muted-foreground text-sm">
                {hello.isLoading ? "Loading..." : hello.data?.greeting}
              </p>
              {session && (
                <p className="text-muted-foreground text-sm italic">
                  {secretMessage.isLoading
                    ? "Loading secret..."
                    : secretMessage.data}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {status === "loading" ? (
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Loading...</p>
              </div>
            ) : session ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {session.user?.image && !imageError ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user?.name ?? "User"}
                        onError={handleImageError}
                      />
                    ) : null}
                    <AvatarFallback className="text-lg">
                      {session.user?.name?.[0] ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center">
                    <p className="text-lg font-medium">
                      Welcome, {session.user?.name ?? "User"}!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => void signOut({ callbackUrl: "/" })}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button asChild variant="default" size="lg" className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
