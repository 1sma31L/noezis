"use client";
// import Question from "@/components/content/Question";
// import { useProfileByUsername } from "@/lib/hooks/useProfile";
// import { useParams } from "next/navigation";
import React from "react";

function UserQuestions() {
  // const { username } = useParams();
  // const { data: profile, isLoading } = useProfileByUsername(username);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      {/* {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))} */}
    </div>
  );
}

export default UserQuestions;
