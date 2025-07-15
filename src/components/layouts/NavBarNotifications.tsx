"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RiNotificationLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBarNotifications() {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <RiNotificationLine className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" sideOffset={20}>
          <DropdownMenuLabel className="font-normal">
            <p className="text-xs leading-none font-medium md:text-sm">
              Notifications
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/notifications">
                <RiNotificationLine className="mr-2 h-4 w-4" />
                <p className="text-xs leading-none font-medium md:text-sm">
                  No notifications yet
                </p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
