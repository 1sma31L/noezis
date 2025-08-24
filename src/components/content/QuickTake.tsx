"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
import type { QuickTakeWithAuthor } from "@/lib/types/quickTake";
import ContentFooter from "./ContentFooter";
import useReaction from "@/lib/hooks/useReaction";

function QuickTake(quickTake: QuickTakeWithAuthor) {
  const { isUpvoted, isDownvoted, toggleReaction, reactionCounts } =
    useReaction(quickTake.id, "quickTake");
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      <ContentHeader
        image={quickTake.author.user.image ?? ""}
        name={quickTake.author.user.name ?? ""}
        jobTitle={quickTake.author.jobTitle ?? ""}
        isVerified={quickTake.author.isVerified}
        createdAt={quickTake.createdAt.toDateString()}
        type="quickTake"
      />

      <CardContent className="flex w-full flex-col items-start justify-start gap-1">
        <p className="text-xs leading-6 sm:text-sm md:text-base">
          {quickTake.content}
        </p>
        <ContentTags tags={quickTake.tags} />

        <ContentFooter
          isUpvoted={isUpvoted}
          isDownvoted={isDownvoted}
          setIsUpvoted={() => {
            toggleReaction({
              contentId: quickTake.id,
              contentType: "quickTake",
              type: "like",
            });
          }}
          setIsDownvoted={() => {
            toggleReaction({
              contentId: quickTake.id,
              contentType: "quickTake",
              type: "dislike",
            });
          }}
          reactionCounts={reactionCounts ?? { likes: 0, dislikes: 0 }}
          id={quickTake.id}
          title={quickTake.content}
        />
      </CardContent>
    </Card>
  );
}

export default QuickTake;
