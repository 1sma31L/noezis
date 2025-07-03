"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

interface QuestionProps {
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
      <CardHeader className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-primary text-background">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
            <p className="text-xs font-medium md:text-base">{user.name}</p>
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {user.job}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-start gap-2">
          <Badge
            variant="outline"
            className={`rounded-full ${
              isAnswered
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {isAnswered ? (
              <Icon icon="mdi:check" className="mr-1 inline-block" />
            ) : (
              <Icon icon="mdi:help-circle" className="mr-1 inline-block" />
            )}
            Question
          </Badge>

          <p className="text-muted-foreground text-[9px] md:text-xs">{date}</p>
        </div>
      </CardHeader>

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

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-accent text-muted-foreground text-[9px] md:text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-2 pt-2">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
            {/* Answer Button */}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 !text-xs"
            >
              <Icon icon="mdi:message-reply-text" className="mr-1 md:mr-2" />
              Answer
            </Button>

            {/* Follow Question */}
            <Button
              variant="outline"
              size="sm"
              className={` ${
                isFollowing
                  ? "bg-primary/10 text-primary border-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <Icon
                icon={isFollowing ? "mdi:bell" : "mdi:bell-outline"}
                className="m-0 md:mr-2"
              />
              <span className="hidden md:block">
                {isFollowing ? "Following" : "Follow"}
              </span>
            </Button>

            {/* Answers Count */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon icon="simple-icons:answer" />
              {answers && <p className="text-xs">{answers}</p>}
            </Button>

            {/* Shares */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <Icon icon="mdi:share" />
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
              <Icon
                icon="mdi:bookmark"
                className={isSaved ? "text-yellow-500" : ""}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon icon="mdi:dots-vertical" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Question;
