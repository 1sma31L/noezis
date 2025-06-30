import Footer from "@/components/Footer";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
