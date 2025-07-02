"use client";

import { type ReactNode } from "react";
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
      <TRPCReactProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
