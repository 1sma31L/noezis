"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/clients/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiUserLine, RiSettingsLine, RiLogoutBoxLine } from "react-icons/ri";
import type { ProfileWithUser } from "@/lib/types/user";

export function NavBarProfile({ profile }: { profile: ProfileWithUser }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 cursor-pointer rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={profile?.user?.image ?? undefined}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary">
              {profile?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={20}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {profile?.user?.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {profile?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={profile ? `/users/${profile.username}` : "#"}
            className="flex items-center"
          >
            <RiUserLine className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <RiSettingsLine className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/signin");
                },
              },
            })
          }
        >
          <RiLogoutBoxLine className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
