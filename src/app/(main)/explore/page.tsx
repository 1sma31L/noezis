"use client";
import { api } from "@/trpc/react";
import React from "react";
import { ProfileCard } from "@/components/ui/profile-card";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/lib/hooks/useProfile";

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

function Explore() {
  const { data: profile } = useProfile();
  const { data: accounts } = api.user.getAllAccounts.useQuery(undefined, {});
  return (
    <main className="container mx-auto max-w-4xl space-y-12 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h1 className="my-2 text-lg font-bold">Suggested Accounts</h1>
          <Link
            href="/explore/accounts"
            className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs font-light sm:text-sm"
          >
            More people to follow
            <RiArrowRightLine className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 2xl:grid-cols-2">
          {accounts
            ?.filter((account) => account.id !== profile?.id)
            .map((account) => (
              <ProfileCard key={account.id} user={account} />
            ))}
        </div>
      </div>

      {/* DISCOVER QUESTIONS */}
      <div className="flex flex-col gap-6" id="questions">
        <div className="flex items-center justify-between px-2">
          <h1 className="my-2 text-lg font-bold">Suggested Questions</h1>
          <Link
            href="/explore/questions"
            className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs font-light sm:text-sm"
          >
            Discover more questions
            <RiArrowRightLine className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4">
          {DUMMY_QUESTIONS.map((question) => (
            <Card
              key={question.id}
              className="hover:bg-muted/50 cursor-pointer p-4 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={question.user.image}
                        alt={question.user.name}
                      />
                      <AvatarFallback>{question.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {question.user.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        @{question.user.username}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href={`/questions/${question.id}`} className="group">
                  <h2 className="text-lg font-semibold">{question.title}</h2>
                </Link>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span>{question.upvotes} upvotes</span>
                  <span>{question.answers} answers</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Explore;
