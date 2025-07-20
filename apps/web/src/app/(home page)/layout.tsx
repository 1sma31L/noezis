import Footer from "@/components/layouts/Footer";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../server/src/lib/auth";
import { headers } from "next/headers";

async function Layout({ children }: { children: React.ReactNode }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session?.user?.id) {
      redirect("/home");
    }
  } catch (error) {
    console.error(error);
    redirect("/signin");
  }
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
