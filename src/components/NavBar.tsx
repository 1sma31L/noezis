"use client";
import React from "react";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

function NavBar() {
  const { data: session } = useSession();
  const { data: profile } = api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },
    { enabled: !!session?.user?.id },
  );

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto px-4 py-4 backdrop-blur-sm">
      <ul className="flex w-full flex-row items-center justify-between gap-2 text-sm md:text-base">
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
            <h1 className="font-bold sm:text-lg md:text-xl">Noezis.</h1>
          </Link>
        </li>
        <li className="flex flex-row items-center justify-center gap-1 lg:gap-2">
          {!session ? (
            <>
              <Button
                variant="default"
                className="hidden rounded-full sm:block"
              >
                <Link href="/signup" className="">
                  Get Started
                </Link>
              </Button>
              <Button variant="ghost" className="hidden rounded-full sm:block">
                <Link href="/signin" className="">
                  Login
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src={session.user?.image ?? ""} />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {session.user?.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={profile ? `/users/${profile.username}` : "#"}
                      className="flex items-center"
                    >
                      <Icon icon="mdi:account" className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Icon icon="mdi:cog" className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => signOut()}
                  >
                    <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
