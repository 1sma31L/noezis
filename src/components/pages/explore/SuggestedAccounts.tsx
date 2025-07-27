"use client";
import { useProfile } from "@/lib/hooks/useProfile";
import { api } from "@/trpc/react";
import React from "react";
import ProfilePreviewCard from "@/components/profile/ProfilePreviewCard";
import SectionTitle from "@/components/pages/SectionTitle";

function SuggestedAccounts() {
  const { data: profile } = useProfile();
  const { data: accounts } = api.user.getAllAccounts.useQuery(undefined, {});
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="Suggested Accounts"
        description="More people to follow"
        href="/explore/accounts"
      />
      <div className="grid gap-4 2xl:grid-cols-2">
        {accounts
          ?.filter((account) => account.id !== profile?.id)
          .map((account) => (
            <ProfilePreviewCard key={account.id} user={account} />
          ))}
      </div>
    </div>
  );
}

export default SuggestedAccounts;
