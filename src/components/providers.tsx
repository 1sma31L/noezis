"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { TRPCReactProvider } from "@/trpc/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <TRPCReactProvider>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          {children}
        </TRPCReactProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
