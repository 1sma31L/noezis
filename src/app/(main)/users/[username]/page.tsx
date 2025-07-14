"use client";
import Post from "@/components/pages/home/Post";
import Answer from "@/components/pages/home/Answer";
import Question from "@/components/pages/home/Question";
import QuickTake from "@/components/pages/home/QuickTake";
import React from "react";
import { use } from "react";
import WhatDoYouThink from "@/components/pages/WhatDoYouThink";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function UserProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile, isLoading } = useProfileByUsername(username);

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

  const questions = [
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
      upvotes: 145,
      downvotes: 8,
      answers: 12,
      views: 1678,
      isAnswered: false,
      shares: 7,
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
      upvotes: 234,
      downvotes: 15,
      answers: 18,
      views: 2456,
      isAnswered: true,
      shares: 45,
    },
  ];

  const quickTakes = [
    {
      id: 1,
      content:
        "Just explored the latest features in TypeScript 5.0 - the decorator improvements and const type parameters are game-changers for type-safe development! 🚀 #TypeScript #WebDev",
      user: userInfo,
      date: "2024-03-20",
      upvotes: 78,
      downvotes: 3,
      shares: 12,
      tags: ["typescript", "webdev", "programming"],
      comments: 8,
    },
    {
      id: 2,
      content:
        "Hot take: The future of development is in developer experience (DX). Tools that prioritize DX while maintaining performance will win the next decade. Look at what Bun, Next.js, and Vercel are doing! 🔥",
      user: userInfo,
      date: "2024-03-19",
      upvotes: 123,
      downvotes: 7,
      shares: 18,
      tags: ["dx", "development", "future"],
      comments: 6,
    },
  ];

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
    <div className="flex min-h-screen flex-col items-start justify-start gap-2 md:gap-4">
      {profile && !isLoading && <WhatDoYouThink />}
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
      {quickTakes.map((quickTake) => (
        <QuickTake key={quickTake.id} {...quickTake} />
      ))}
      <Answer {...exampleAnswer} />
      {/* {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))} */}
    </div>
  );
}

export default UserProfile;
