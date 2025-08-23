"use client";
import React from "react";
import Answer from "@/components/content/Answer";
import { use } from "react";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function UserAnswers({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile, isLoading } = useProfileByUsername(username);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      {/* <Answer {...exampleAnswer} /> */}
    </div>
  );
}

export default UserAnswers;
