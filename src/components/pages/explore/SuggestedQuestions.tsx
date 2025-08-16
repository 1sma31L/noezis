import React from "react";
import SectionTitle from "@/components/pages/SectionTitle";
import QuestionPreviewCard from "@/components/content/QuestionPreviewCard";
import { api } from "@/trpc/server";

async function SuggestedQuestions() {
  const questions = await api.content.getQuestions();
  return (
    <div className="flex flex-col gap-6" id="questions">
      <SectionTitle
        title="Suggested Questions"
        description="Discover more questions"
        href="/explore/questions"
      />
      <div className="grid gap-4">
        {questions?.map((question) => (
          <QuestionPreviewCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;
