import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/buttons/ModeToggle";
import { NavBarAuth } from "./NavBarAuth";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    await api.user.getProfileByUserId.prefetch({
      userId: session.user.id,
    });
  }

  return (
    <HydrateClient>
      <nav className="bg-background/80 fixed top-0 right-0 left-0 z-50 container mx-auto px-4 py-4 backdrop-blur-md">
        <ul className="flex w-full flex-row items-center justify-between gap-1 text-sm md:text-base lg:gap-2">
          <li>
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
            <ModeToggle />
            <NavBarAuth session={session} />
          </li>
        </ul>
      </nav>
    </HydrateClient>
  );
}

export default NavBar;
