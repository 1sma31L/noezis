"use client";

import { type ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "next-themes";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import { ProfileProvider } from "@/lib/providers/profile-provider";

export function Providers({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          richColors
          closeButton
          position="top-center"
          theme={(resolvedTheme as "light" | "dark" | "system") ?? "system"}
        />
        <ProfileProvider>{children}</ProfileProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
