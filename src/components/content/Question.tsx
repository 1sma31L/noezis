"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RiBookmarkLine,
  RiCheckboxCircleFill,
  RiQuestionLine,
  RiMessage2Line,
  RiShareLine,
  RiMoreLine,
  RiBookmarkFill,
  RiNotificationLine,
  RiNotificationFill,
} from "react-icons/ri";
import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
export interface QuestionProps {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    username: string;
    image: string;
    job: string;
    isVerified: boolean;
  };
  date: string;
  tags: string[];
  answers: number;
  isAnswered: boolean;
  shares: number;
}

function Question({
  id,
  title,
  content,
  user,
  date,
  tags,
  answers,
  isAnswered,
  shares,
}: QuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const wordCount = content.trim().split(/\s+/).length;
  const MAX_WORDS = 50;
  const shouldShowMore = wordCount > MAX_WORDS;

  const truncateWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <Card
      className={`flex w-full flex-col items-start justify-start gap-4 md:gap-6 ${
        isAnswered ? "border-l-primary border-l-4" : ""
      }`}
    >
      <ContentHeader
        image={user.image ?? ""}
        name={user.name ?? ""}
        jobTitle={user.job ?? ""}
        isVerified={user.isVerified}
        createdAt={date}
        isAnswered={isAnswered}
        type="question"
      />

      <CardContent className="flex w-full flex-col items-start justify-start gap-4">
        <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
            {title}
          </CardTitle>
        </div>

        <CardDescription className="flex w-full flex-col gap-2">
          <div className="relative">
            <p className="text-muted-foreground text-xs leading-6 sm:text-sm md:text-base">
              {isExpanded ? content : truncateWords(content, MAX_WORDS)}
            </p>
            {!isExpanded && shouldShowMore && (
              <div
                className="absolute right-0 bottom-0 left-0 h-24"
                style={{
                  background:
                    "linear-gradient(to top, var(--card), transparent)",
                }}
              />
            )}
          </div>
          {shouldShowMore && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground w-fit text-xs"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See less" : "See more"}
            </Button>
          )}
        </CardDescription>

        <ContentTags tags={tags} />

        <div className="flex w-full flex-row items-center justify-between gap-2 pt-2">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
            {/* Answer Button */}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 !text-xs"
            >
              <RiMessage2Line className="mr-1 md:mr-2" />
              Answer
            </Button>

            {/* Follow Question */}
            <Button
              variant="ghost"
              size="icon"
              className={` ${
                isFollowing
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? <RiNotificationFill /> : <RiNotificationLine />}
            </Button>

            {/* Answers Count */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMessage2Line />
              {answers && <p className="text-xs">{answers}</p>}
            </Button>

            {/* Shares */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <RiShareLine />
              {shares && <p className="text-xs">{shares}</p>}
            </Button>
          </div>

          {/* Save */}
          <div className="flex flex-row items-center justify-start gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? (
                <RiBookmarkFill className="text-yellow-500" />
              ) : (
                <RiBookmarkLine className="text-muted-foreground" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMoreLine />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Question;
