"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RiCheckboxCircleFill } from "react-icons/ri";
import type { AnswerWithAuthor } from "@/lib/types/answer";
import { api } from "@/trpc/react";
import ContentFooter from "./ContentFooter";
import useReaction from "@/lib/hooks/useReaction";
import useExpanded from "@/lib/hooks/useExpanded";
import { formatDistanceToNow } from "date-fns";

function Answer(answer: AnswerWithAuthor) {
  const { isUpvoted, isDownvoted, toggleReaction, reactionCounts } =
    useReaction(answer.id, "answer");

  const { data: question } = api.content.getQuestion.useQuery({
    id: answer.questionId,
  });

  const {
    isExpanded,
    setIsExpanded,
    shouldShowMore,
    truncateWords,
    MAX_WORDS,
  } = useExpanded(answer.content, false);

  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      {/* Answer Section */}
      <CardHeader className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage
                src={answer.author.user.image ?? ""}
                alt={answer.author.user.name ?? ""}
              />
              <AvatarFallback className="bg-primary text-background">
                {answer.author.user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
              <p className="flex flex-row items-center justify-start gap-1 text-xs font-medium md:text-base">
                {answer.author.user.name}
                {answer.author.isVerified && (
                  <RiCheckboxCircleFill
                    style={{
                      color: "#2a623d",
                      display: "inline-block",
                    }}
                  />
                )}
              </p>
              <p className="text-muted-foreground text-[9px] md:text-xs">
                {answer.author.jobTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-2">
            {true && (
              <Badge
                variant="outline"
                className="rounded-full bg-green-500/10 text-green-500"
              >
                <RiCheckboxCircleFill className="mr-1 inline-block" />
                Answer
              </Badge>
            )}
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {formatDistanceToNow(new Date(answer.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div>
          <p className="mt-2 text-xs leading-6 sm:text-sm md:text-base">
            {answer.content}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {answer.tags?.map((tag: string) => (
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

      {/* Question Section */}
      <CardContent className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage
              src={question?.author.user.image ?? ""}
              alt={question?.author.user.name ?? ""}
            />
            <AvatarFallback className="bg-primary text-background">
              {question?.author.user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="flex flex-row items-center justify-start gap-1 text-xs font-medium md:text-base">
                {question?.author.user.name}
                {question?.author.isVerified && (
                  <RiCheckboxCircleFill
                    style={{
                      color: "#2a623d",
                      display: "inline-block",
                    }}
                  />
                )}
              </p>
            </div>
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {question?.author.jobTitle}
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
            {question?.title}
          </CardTitle>
          <p className="text-muted-foreground text-xs leading-6 sm:text-sm md:text-base">
            {isExpanded
              ? question?.content
              : truncateWords(question?.content ?? "", MAX_WORDS)}
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
        <ContentFooter
          isUpvoted={isUpvoted}
          isDownvoted={isDownvoted}
          setIsUpvoted={() => {
            toggleReaction({
              contentId: answer.id,
              contentType: "answer",
              type: "like",
            });
          }}
          setIsDownvoted={() => {
            toggleReaction({
              contentId: answer.id,
              contentType: "answer",
              type: "dislike",
            });
          }}
          reactionCounts={reactionCounts ?? { likes: 0, dislikes: 0 }}
          id={answer.id}
          title={question?.title ?? ""}
        />
      </CardContent>
    </Card>
  );
}

export default Answer;
