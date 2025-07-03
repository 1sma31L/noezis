/* eslint-disable @next/next/no-img-element */
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  RiCheckboxCircleFill,
  RiThumbUpLine,
  RiThumbDownLine,
  RiMessage2Line,
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiMoreLine,
  RiThumbUpFill,
  RiThumbDownFill,
} from "react-icons/ri";

interface AnswerProps {
  question: {
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
  };
  answer: {
    id: number;
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
    upvotes: number;
    downvotes: number;
    comments: number;
    isAccepted: boolean;
    shares: number;
  };
}

function Answer({ question, answer }: AnswerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const wordCount = answer.content.trim().split(/\s+/).length;
  const MAX_WORDS = 50;
  const shouldShowMore = wordCount > MAX_WORDS;

  const truncateWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      {/* Question Section */}
      <CardHeader className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src={question.user.image} alt={question.user.name} />
              <AvatarFallback className="bg-primary text-background">
                {question.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
              <p className="text-xs font-medium md:text-base">
                {question.user.name}
              </p>
              <p className="text-muted-foreground text-[9px] md:text-xs">
                {question.user.job}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-2">
            {answer.isAccepted && (
              <Badge
                variant="outline"
                className="rounded-full bg-green-500/10 text-green-500"
              >
                <RiCheckboxCircleFill className="mr-1 inline-block" />
                Answer
              </Badge>
            )}
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {question.date}
            </p>
          </div>
        </div>
        <div>
          <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
            {question.title}
          </CardTitle>
          <CardDescription className="mt-2 text-xs leading-6 sm:text-sm md:text-base">
            {question.content}
          </CardDescription>
          <div className="mt-2 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-accent text-muted-foreground text-[9px] md:text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <Separator />

      {/* Answer Section */}
      <CardContent className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src={answer.user.image} alt={answer.user.name} />
            <AvatarFallback className="bg-primary text-background">
              {answer.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium md:text-base">
                {answer.user.name}
              </p>
            </div>
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {answer.user.job}
            </p>
          </div>
        </div>

        <div className="relative">
          <p className="text-muted-foreground text-xs leading-6 sm:text-sm md:text-base">
            {isExpanded
              ? answer.content
              : truncateWords(answer.content, MAX_WORDS)}
          </p>
          {!isExpanded && shouldShowMore && (
            <div
              className="absolute right-0 bottom-0 left-0 h-24"
              style={{
                background: "linear-gradient(to top, var(--card), transparent)",
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

        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
            {/* Voting */}
            <div className="bg-muted/50 flex h-8 flex-row items-center justify-start gap-2 rounded-full px-2">
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-foreground flex flex-row items-center justify-start gap-2 ${
                  isUpvoted ? "text-primary hover:text-primary" : ""
                }`}
                onClick={() => {
                  if (isDownvoted) setIsDownvoted(false);
                  setIsUpvoted(!isUpvoted);
                }}
              >
                {isUpvoted ? (
                  <RiThumbUpFill className="text-primary" />
                ) : (
                  <RiThumbUpLine />
                )}
                <span className="text-[9px] md:text-xs">{answer.upvotes}</span>
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-foreground ${
                  isDownvoted ? "text-destructive hover:text-destructive" : ""
                }`}
                onClick={() => {
                  if (isUpvoted) setIsUpvoted(false);
                  setIsDownvoted(!isDownvoted);
                }}
              >
                {isDownvoted ? (
                  <RiThumbDownFill className="text-destructive" />
                ) : (
                  <RiThumbDownLine />
                )}
                <span className="text-[9px] md:text-xs">
                  {answer.downvotes}
                </span>
              </Button>
            </div>

            {/* Comments */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMessage2Line />
              <p className="text-[9px] md:text-xs">{answer.comments}</p>
            </Button>

            {/* Shares */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <RiShareLine />
              {answer.shares && (
                <p className="text-[9px] md:text-xs">{answer.shares}</p>
              )}
            </Button>
          </div>

          {/* Save + Settings */}
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

export default Answer;
