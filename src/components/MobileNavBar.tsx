"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

function MobileNavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: profile, isLoading } = api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },
    { enabled: !!session?.user?.id },
  );

  const navigationItems = [
    {
      label: "Home",
      href: "/home",
      icon: "ic:baseline-home",
      activeIcon: "ic:baseline-home",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: "ic:outline-explore",
      activeIcon: "ic:baseline-explore",
    },
    {
      label: "Post",
      href: "#",
      icon: "ic:outline-add-circle",
      activeIcon: "ic:baseline-add-circle",
      isSpecial: true,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: "ic:outline-chat",
      activeIcon: "ic:baseline-chat",
    },
    {
      label: "Profile",
      href: `${profile?.id ? `/users/${profile?.username}` : "/signin"}`,
      icon: "ic:outline-person",
      activeIcon: "ic:baseline-person",
    },
  ];

  return (
    <nav className="bg-background/80 border-border fixed right-0 bottom-0 left-0 z-50 container mx-auto flex h-16 items-center justify-around border-x border-t backdrop-blur-md lg:hidden">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              isActive ? "text-primary" : "text-muted-foreground",
              item.isSpecial && "relative -top-4",
              item.label === "Profile" && isLoading && "opacity-50",
            )}
          >
            <Icon
              icon={isActive ? item.activeIcon : item.icon}
              className={cn(
                "transition-all",
                item.isSpecial ? "text-primary h-12 w-12" : "h-6 w-6",
              )}
            />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileNavBar;
