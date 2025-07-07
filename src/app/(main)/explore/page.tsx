"use client";
import { api } from "@/trpc/react";
import React from "react";
import { ProfileCard } from "@/components/ui/profile-card";

function Explore() {
  const { data: accounts } = api.user.getAllAccounts.useQuery(undefined, {});

  return (
    <main className="container mx-auto max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h1 className="my-2 text-lg font-bold">Sugested Accounts</h1>
          <p className="text-muted-foreground text-xs font-light sm:text-sm">
            Discover people to follow
          </p>
        </div>
        <div className="grid gap-4 2xl:grid-cols-2">
          {accounts?.map((account) => (
            <ProfileCard key={account.id} user={account} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Explore;
