"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { RiHome2Line, RiArrowLeftLine } from "react-icons/ri";

function BackButton() {
  return (
    <Button
      variant="default"
      className="flex flex-1 items-center justify-center gap-2"
      onClick={() => window.history.back()}
    >
      <RiArrowLeftLine />
      Go Back
    </Button>
  );
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Oops! Page not found
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/">
                <RiHome2Line />
                Go Home
              </Link>
            </Button>
            <BackButton />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
