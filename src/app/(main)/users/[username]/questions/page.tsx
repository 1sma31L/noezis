"use client";
import Question from "@/components/content/Question";
import { use } from "react";
import React from "react";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function UserQuestions({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile, isLoading } = useProfileByUsername(username);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      {/* {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))} */}
    </div>
  );
}

export default UserQuestions;
