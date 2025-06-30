import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen">
      <aside className="hidden lg:block">
        <LeftSidebar />
      </aside>
      <main className="border-border flex-1 border-x">{children}</main>
      <aside className="hidden xl:block">
        <RightSidebar />
      </aside>
    </div>
  );
}

export default Layout;
