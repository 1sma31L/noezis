"use client";

import React from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { RiSearchLine } from "react-icons/ri";

function RightSidebar() {
  const trendingTopics = [
    {
      title: "Technology",
      posts: "125K posts",
    },
    {
      title: "Programming",
      posts: "89K posts",
    },
    {
      title: "Web Development",
      posts: "45K posts",
    },
    {
      title: "Artificial Intelligence",
      posts: "200K posts",
    },
  ];

  return (
    <div className="sticky top-20 flex w-80 flex-col gap-4 px-4">
      <div className="relative">
        <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search"
          className="bg-card rounded-full pr-4 pl-10"
        />
      </div>

      <Card className="rounded-xl p-4">
        <h2 className="mb-4 text-xl font-bold">What&apos;s trending</h2>
        <div className="flex flex-col gap-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="hover:bg-muted/50 flex cursor-pointer flex-col gap-1 rounded-lg p-2 transition-colors"
            >
              <h3 className="font-semibold">{topic.title}</h3>
              <p className="text-muted-foreground text-sm">{topic.posts}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default RightSidebar;
