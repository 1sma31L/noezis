"use client";

import React from "react";
import { useProfile } from "@/lib/hooks/useProfile";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { NavBarNotifications } from "./NavBarNotifications";
import { NavBarProfile } from "./NavBarProfile";

export function NavBarAuth() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <>
        <Button variant="default" className="hidden rounded-full sm:block">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button variant="ghost" className="hidden rounded-full sm:block">
          <Link href="/signin">Login</Link>
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
      <NavBarNotifications />
      <NavBarProfile profile={profile} />
    </div>
  );
}
