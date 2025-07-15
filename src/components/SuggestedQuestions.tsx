import React from "react";
import SectionTitle from "@/components/SectionTitle";
import QuestionPreviewCard from "./QuestionPreviewCard";

const DUMMY_QUESTIONS = [
  {
    id: "1",
    title: "What's your take on the future of AI in software development?",
    user: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
      username: "johndoe",
    },
    tags: ["AI", "Software Development", "Technology"],
    upvotes: 42,
    answers: 15,
  },
  {
    id: "2",
    title: "How do you handle state management in large React applications?",
    user: {
      name: "Jane Smith",
      image: "https://github.com/shadcn.png",
      username: "janesmith",
    },
    tags: ["React", "State Management", "Web Development"],
    upvotes: 38,
    answers: 12,
  },
  {
    id: "3",
    title: "What are the best practices for API security in 2024?",
    user: {
      name: "Alex Johnson",
      image: "https://github.com/shadcn.png",
      username: "alexj",
    },
    tags: ["Security", "API", "Backend"],
    upvotes: 56,
    answers: 20,
  },
];

function SuggestedQuestions() {
  return (
    <div className="flex flex-col gap-6" id="questions">
      <SectionTitle
        title="Suggested Questions"
        description="Discover more questions"
        href="/explore/questions"
      />
      <div className="grid gap-4">
        {DUMMY_QUESTIONS.map((question) => (
          <QuestionPreviewCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;
