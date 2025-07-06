"use client";
import Question, { type QuestionProps } from "@/components/pages/home/Question";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { use } from "react";
import React from "react";

function UserQuestions({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile } = useProfileByUsername(username);
  const userInfo = {
    id: 1,
    name:
      profile?.user.name ??
      username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
    username: profile?.username ?? username,
    image:
      profile?.user.image ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    job: "Tech Enthusiast",
    isVerified: profile?.isVerified ?? true,
  };

  const questions: QuestionProps[] = [
    {
      id: 1,
      title: "What's your take on the future of web development?",
      content: `As someone deeply involved in web development, I've been thinking about where the industry is heading. I'd love to hear your thoughts on:

1. The role of AI in web development
2. The evolution of frontend frameworks
3. The impact of WebAssembly
4. The future of serverless architecture

What trends do you see shaping the future of web development?`,
      user: userInfo,
      date: "2024-03-18",
      tags: ["webdev", "frontend", "technology", "future"],
      answers: Math.floor(Math.random() * 15),
      isAnswered: false,
      shares: Math.floor(Math.random() * 10),
    },
    {
      id: 2,
      title: "How do you approach learning new technologies?",
      content: `With the rapid pace of technological change, staying updated can be challenging. I'm curious about effective learning strategies:

- How do you prioritize which technologies to learn?
- What resources do you find most helpful?
- How do you balance learning with practical application?
- What's your approach to evaluating new tools and frameworks?`,
      user: userInfo,
      date: "2024-03-17",
      tags: ["learning", "technology", "career", "development"],
      answers: Math.floor(Math.random() * 25),
      isAnswered: true,
      shares: Math.floor(Math.random() * 100),
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4 py-4">
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </div>
  );
}

export default UserQuestions;
