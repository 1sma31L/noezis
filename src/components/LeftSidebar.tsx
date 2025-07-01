"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";

function LeftSidebar() {
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
      notActiveIcon: <Icon icon="ic:outline-home" className="h-6! w-6!" />,
      activeIcon: (
        <Icon
          icon="ic:baseline-home"
          className="h-6! w-6!"
          style={{ color: "#2a623d" }}
        />
      ),
    },
    {
      label: "Explore",
      href: "/explore",
      notActiveIcon: <Icon icon="ic:outline-explore" className="h-6! w-6!" />,
      activeIcon: (
        <Icon
          icon="ic:baseline-explore"
          className="h-6! w-6!"
          style={{ color: "#2a623d" }}
        />
      ),
    },
    {
      label: "Notifications",
      href: "/notifications",
      notActiveIcon: (
        <Icon icon="ic:outline-notifications" className="h-6! w-6!" />
      ),
      activeIcon: (
        <Icon
          icon="ic:baseline-notifications"
          className="h-6! w-6!"
          style={{ color: "#2a623d" }}
        />
      ),
    },
    {
      label: "Messages",
      href: "/messages",
      notActiveIcon: <Icon icon="ic:outline-chat" className="h-6! w-6!" />,
      activeIcon: (
        <Icon
          icon="ic:baseline-chat"
          className="h-6! w-6!"
          style={{ color: "#2a623d" }}
        />
      ),
    },
    {
      label: "Profile",
      href: `${profile?.id ? `/users/${profile?.username}` : "/signin"}`,
      notActiveIcon: <Icon icon="ic:outline-person" className="h-6! w-6!" />,
      activeIcon: (
        <Icon
          icon="ic:baseline-person"
          className="h-6! w-6!"
          style={{ color: "#2a623d" }}
        />
      ),
    },
  ];

  return (
    <div className="sticky top-20 flex w-72 flex-col gap-2 px-4">
      {navigationItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 rounded-full px-6 py-6 text-xl"
            disabled={item.label === "Profile" && isLoading}
          >
            {pathname === item.href ? item.activeIcon : item.notActiveIcon}
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
