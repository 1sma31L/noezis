"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileTabs({
  navigationTabs,
}: {
  navigationTabs: {
    label: string;
    href: string;
  }[];
}) {
  const pathname = usePathname();
  const tabName = pathname.split("/")[3] ?? "";
  const [activeTab, setActiveTab] = useState(tabName);
  useEffect(() => {
    setActiveTab(tabName);
  }, [tabName]);

  return (
    <div className="flex h-5 w-full flex-row items-center justify-between gap-1 md:justify-center md:gap-4">
      {navigationTabs.map((tab, index) => {
        const isActive =
          activeTab === tab.label.toLowerCase() ||
          (activeTab === "" && index === 0);
        return (
          // I LOVE THIS FRAGMENT
          <Fragment key={tab.label}>
            <Button
              asChild
              variant="ghost"
              size="sm"
              key={tab.label}
              className={`rounded-b-none px-2 md:px-4 ${
                isActive
                  ? "border-primary text-foreground border-b-3"
                  : "text-muted-foreground hover:text-foreground"
              } text-[9px] sm:text-[10px] md:text-sm`}
            >
              <Link href={tab.href}>{tab.label}</Link>
            </Button>
            {index !== navigationTabs.length - 1 && (
              <Separator orientation="vertical" className="mx-1" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default ProfileTabs;
