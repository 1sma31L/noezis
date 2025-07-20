import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/server/lib/auth";
import { headers } from "next/headers";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user?.id) {
    redirect("/home");
  }
  return <div>{children}</div>;
}

export default Layout;
