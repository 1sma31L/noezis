"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { TRPCReactProvider } from "@/trpc/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </TRPCReactProvider>
    </SessionProvider>
  );
}
