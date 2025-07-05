import React from "react";
import LeftSidebar from "@/components/layouts/LeftSidebar";
import RightSidebar from "@/components/layouts/RightSidebar";
import MobileNavBar from "@/components/layouts/mobile/MobileNavBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative top-[4.5rem] container mx-auto flex min-h-screen">
      <aside className="hidden lg:block">
        <LeftSidebar />
      </aside>
      <div className="border-border flex-1 border-x px-2 pb-24">{children}</div>
      <aside className="hidden xl:block">
        <RightSidebar />
      </aside>
      <MobileNavBar />
    </div>
  );
}

export default Layout;
