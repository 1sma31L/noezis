"use client";

import React from "react";
import { useProfile } from "@/lib/hooks/useProfile";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { NavBarNotifications } from "./NavBarNotifications";
import { NavBarProfile } from "./NavBarProfile";
import type { Session } from "@/server/lib/auth";
import { useSession } from "@/lib/hooks/useSession";

export function NavBarAuth({
  session: serverSession,
}: {
  session?: Session | null;
}) {
  const { data: profile } = useProfile();
  const { data: session } = useSession(serverSession);

  if (!session?.session) {
    return (
      <>
        <Button
          variant="default"
          className="hidden rounded-full sm:block"
          asChild
        >
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button
          variant="ghost"
          className="hidden rounded-full sm:block"
          asChild
        >
          <Link href="/signin">Login</Link>
        </Button>
      </>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
  //       <Skeleton className="h-8 w-8 rounded-full" />
  //       <Skeleton className="h-8 w-8 rounded-full" />
  //     </div>
  //   );
  // }
  if (session.user && !profile) {
    // Skele of picture
    return (
      <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
        <Skeleton className="h-8 w-8 rounded-full px-1" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
      <NavBarNotifications />
      <NavBarProfile profile={profile} />
    </div>
  );
}
