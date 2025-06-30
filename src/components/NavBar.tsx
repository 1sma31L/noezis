"use client";
import React from "react";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";

function NavBar() {
  const { data: session, status } = useSession();
  const { data: profile } = api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },
    { enabled: !!session?.user?.id },
  );

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-10 py-4 backdrop-blur-sm">
      <ul className="flex w-full flex-row items-center justify-between gap-2">
        <li className="flex flex-row items-center justify-center gap-1">
          <Link
            href="/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="Noezis"
              width={100}
              height={100}
              className="w-10 dark:invert"
            />
            <h1 className="text-lg font-bold">Noezis.</h1>
          </Link>
        </li>
        <li className="flex flex-row items-center justify-center gap-2">
          {!session ? (
            <>
              <Button variant="default" className="rounded-full" size={"lg"}>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" className="rounded-full" size={"lg"}>
                <Link href="/signin">Login</Link>
              </Button>
            </>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2">
              <Link
                href={profile ? `/users/${profile.username}` : "#"}
                className="flex flex-row items-center justify-center gap-2"
              >
                <Avatar>
                  <AvatarImage src={session.user?.image ?? ""} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="rounded-full"
                size={"lg"}
              >
                Logout
              </Button>
            </div>
          )}
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
