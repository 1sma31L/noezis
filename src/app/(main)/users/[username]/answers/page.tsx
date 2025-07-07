"use client";
import React from "react";
import Answer from "@/components/pages/home/Answer";
import { use } from "react";
import { useVisitedProfile } from "@/lib/hooks/useVisitedProfile";

function UserAnswers({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { visitedProfile: profile } = useVisitedProfile();

  const userInfo = {
    id: 1,
    name:
      profile?.user.name ??
      username.charAt(0).toUpperCase() + username.slice(1),
    username: profile?.username ?? username,
    image:
      profile?.user.image ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    job: "Tech Enthusiast",
    isVerified: profile?.isVerified ?? true,
  };
  const exampleAnswer = {
    question: {
      id: 3,
      title: "What's the role of AI in modern software development?",
      content:
        "As AI tools become more prevalent in software development, I'm curious about their impact on our workflow. How are AI tools changing the way we write and maintain code?",
      user: {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
        job: "Tech Enthusiast",
        isVerified: true,
      },
      date: "2024-03-15",
      tags: ["AI", "Software Development", "Technology", "Future"],
    },
    answer: {
      id: 1,
      content: `AI is revolutionizing software development in several key ways:

1. Code Generation: AI can now generate boilerplate code, suggest completions, and even implement entire functions based on natural language descriptions.

2. Code Review: AI tools can analyze code for potential bugs, security vulnerabilities, and performance issues before deployment.

3. Testing: AI can generate test cases, identify edge cases, and help maintain test coverage as code evolves.

4. Documentation: AI assists in creating and maintaining documentation, making it easier to keep docs in sync with code changes.

5. Development Workflow: AI-powered tools are streamlining various aspects of the development process, from git commit messages to deployment strategies.

However, it's important to note that AI is an assistant, not a replacement. The developer's expertise in system design, architecture decisions, and understanding business requirements remains crucial.`,
      user: userInfo,
      date: "2024-03-16",
      upvotes: 156,
      downvotes: 3,
      comments: 42,
      isAccepted: true,
      shares: 8,
    },
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      <Answer {...exampleAnswer} />
    </div>
  );
}

export default UserAnswers;
