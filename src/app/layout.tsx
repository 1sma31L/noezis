import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { type ReactNode } from "react";

import { Providers } from "@/app/components/providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Noezis",
  description: "Social media for the modern age",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
