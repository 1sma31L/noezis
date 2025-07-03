"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";
import {
  RiHome6Line,
  RiHome6Fill,
  RiMap2Line,
  RiMap2Fill,
  RiNotificationLine,
  RiNotificationFill,
  RiMessageLine,
  RiMessageFill,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

function LeftSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: profile, isLoading } = api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },
    {
      enabled: !!session?.user?.id,
      staleTime: 1000 * 60 * 5,
    },
  );
  const navigationItems = [
    {
      label: "Home",
      href: "/home",
      icon: RiHome6Line,
      activeIcon: RiHome6Fill,
    },
    {
      label: "Explore",
      href: "/explore",
      icon: RiMap2Line,
      activeIcon: RiMap2Fill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: RiNotificationLine,
      activeIcon: RiNotificationFill,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: RiMessageLine,
      activeIcon: RiMessageFill,
    },
    {
      label: "Profile",
      href: `${profile?.id ? `/users/${profile?.username}` : "/signin"}`,
      icon: RiUser3Line,
      activeIcon: RiUser3Fill,
    },
  ];

  return (
    <div className="sticky top-20 flex w-72 flex-col gap-2 px-4">
      {navigationItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 rounded-full px-6 py-6"
            disabled={item.label === "Profile" && isLoading}
          >
            {pathname === item.href ? (
              <item.activeIcon className="text-primary !h-5 !w-5" />
            ) : (
              <item.icon className="!h-5 !w-5" />
            )}
            <span className="hidden text-sm lg:inline">{item.label}</span>
          </Button>
        </Link>
      ))}
      <div className="mt-4 flex w-full items-center justify-center">
        <Button className="bg-primary w-full rounded-full px-6 py-6 text-xl font-semibold">
          <span className="hidden lg:inline">Post</span>
        </Button>
      </div>
    </div>
  );
}

export default LeftSidebar;
