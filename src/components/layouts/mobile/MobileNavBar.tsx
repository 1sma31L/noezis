"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/lib/hooks/useProfile";
import { cn } from "@/lib/utils";
import {
  RiHome6Line,
  RiHome6Fill,
  RiMap2Line,
  RiMap2Fill,
  RiAddLargeLine,
  RiAddLargeFill,
  RiMessageLine,
  RiMessageFill,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

function MobileNavBar() {
  const pathname = usePathname();
  const { data: profile } = useProfile();

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
      label: "Post",
      href: "/posts/create",
      icon: RiAddLargeLine,
      activeIcon: RiAddLargeFill,
      isSpecial: true,
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
    <nav className="bg-background/80 border-border fixed right-0 bottom-0 left-0 z-50 container mx-auto flex h-16 items-center justify-around border-x border-t backdrop-blur-md lg:hidden">
      {navigationItems.map((item) => {
        const isActive = pathname.includes(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              isActive ? "text-primary" : "text-muted-foreground",
              item.isSpecial && "relative -top-2",
            )}
          >
            <div className="text-xl">
              {isActive ? <item.activeIcon /> : <item.icon />}
            </div>

            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileNavBar;
