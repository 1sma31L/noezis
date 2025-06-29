/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold">Noezis</h1>
        <p className="text-xl">Social media for the modern age</p>

        <div className="mt-8 space-y-4">
          {status === "loading" ? (
            <p className="text-lg">Loading...</p>
          ) : session ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <p className="text-lg">
                  Welcome, {session.user?.name ?? "User"}!
                </p>
              </div>
              <button
                onClick={() => void signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/signin"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
