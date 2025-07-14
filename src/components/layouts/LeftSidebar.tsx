"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useProfile } from "@/lib/hooks/useProfile";
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
  const { data: profile, isLoading } = useProfile();

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
      {navigationItems.map((item) => {
        const isActive = pathname.includes(item.href);
        return (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-full px-6 py-6 ${
              isActive
                ? "bg-primary/10 hover:bg-primary/20 dark:bg-primary/10 dark:hover:bg-primary/20"
                : ""
            }`}
            disabled={item.label === "Profile" && isLoading}
            asChild
          >
            <Link key={item.label} href={item.href}>
              {isActive ? (
                <item.activeIcon className="text-primary !h-5 !w-5" />
              ) : (
                <item.icon className="!h-5 !w-5" />
              )}
              <span className="hidden text-sm lg:inline">{item.label}</span>
            </Link>
          </Button>
        );
      })}
      <div className="mt-4 flex w-full items-center justify-center">
        <Button
          className={`bg-primary w-full rounded-full px-6 py-6 text-xl font-semibold ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          asChild
          disabled={!profile?.id || isLoading}
        >
          <Link href={profile?.id ? `/posts/create` : "/signin"}>Post</Link>
        </Button>
      </div>
    </div>
  );
}

export default LeftSidebar;
