import "@/styles/globals.css";

import { type Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { type ReactNode } from "react";

import { Providers } from "@/lib/providers";
import NavBar from "@/components/layouts/NavBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
