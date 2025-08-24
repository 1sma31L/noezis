"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
import type { QuestionWithAuthor } from "@/lib/types/question";
import ContentFooter from "./ContentFooter";
import useReaction from "@/lib/hooks/useReaction";
import useExpanded from "@/lib/hooks/useExpanded";

function Question(question: QuestionWithAuthor) {
  const { isUpvoted, isDownvoted, toggleReaction, reactionCounts } =
    useReaction(question.id, "question");

  const {
    isExpanded,
    setIsExpanded,
    shouldShowMore,
    truncateWords,
    MAX_WORDS,
  } = useExpanded(question.content, false);

  return (
    <Card
      className={`flex w-full flex-col items-start justify-start gap-4 md:gap-6`}
    >
      {/* question.isAnswered ? "border-l-primary border-l-4" : "" */}
      <ContentHeader
        image={question.author.user.image ?? ""}
        name={question.author.user.name ?? ""}
        jobTitle={question.author.jobTitle ?? ""}
        isVerified={question.author.isVerified}
        createdAt={question.createdAt.toISOString()}
        isAnswered={false}
        type="question"
      />

      <CardContent className="flex w-full flex-col items-start justify-start gap-4">
        <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
            {question.title}
          </CardTitle>
        </div>

        <CardDescription className="flex w-full flex-col gap-2">
          <div className="relative">
            <p className="text-muted-foreground text-xs leading-6 sm:text-sm md:text-base">
              {isExpanded
                ? question.content
                : truncateWords(question.content, MAX_WORDS)}
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

        <ContentTags tags={question.tags} />

        <ContentFooter
          isUpvoted={isUpvoted}
          isDownvoted={isDownvoted}
          setIsUpvoted={() => {
            toggleReaction({
              contentId: question.id,
              contentType: "question",
              type: "like",
            });
          }}
          setIsDownvoted={() => {
            toggleReaction({
              contentId: question.id,
              contentType: "question",
              type: "dislike",
            });
          }}
          reactionCounts={reactionCounts ?? { likes: 0, dislikes: 0 }}
          id={question.id}
          title={question.title}
        />

        {/* <div className="flex w-full flex-row items-center justify-between gap-2 pt-2">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 !text-xs"
            >
              <RiMessage2Line className="mr-1 md:mr-2" />
              Answer
            </Button>

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

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMessage2Line />
              <p className="text-[9px] md:text-xs">0</p>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <RiShareLine />
              <p className="text-[9px] md:text-xs">0</p>
            </Button>
          </div>

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
        </div> */}
      </CardContent>
    </Card>
  );
}

export default Question;
