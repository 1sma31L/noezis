"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RiBookmarkLine,
  RiThumbUpLine,
  RiMessage2Line,
  RiShareLine,
  RiThumbDownLine,
  RiMoreLine,
  RiThumbUpFill,
  RiThumbDownFill,
  RiBookmarkFill,
} from "react-icons/ri";
import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
import type { QuickTakeWithAuthor } from "@/lib/types/quickTake";
import { api } from "@/trpc/react";
import { useSession } from "@/lib/hooks/useSession";

function QuickTake(quickTake: QuickTakeWithAuthor) {
  const { data: session } = useSession();
  const { data: reactionStatus, refetch: refetchReactionStatus } =
    api.reaction.getReactionStatus.useQuery(
      {
        contentId: quickTake.id,
        contentType: "quickTake",
      },
      {
        enabled: !!quickTake.id || !!session?.user?.id,
      },
    );

  const { data: reactionCounts, refetch: refetchReactionCounts } =
    api.reaction.getReactionCounts.useQuery({
      contentId: quickTake.id,
      contentType: "quickTake",
    });

  const { mutate: toggleReaction } = api.reaction.toggleReaction.useMutation({
    onSuccess: () => {
      refetchReactionStatus();
      refetchReactionCounts();
    },
  });

  const isUpvoted = reactionStatus?.reactionType === "like";
  const isDownvoted = reactionStatus?.reactionType === "dislike";

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

        <div className="flex w-full flex-row items-center justify-between gap-2 pt-4">
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
                  toggleReaction({
                    contentId: quickTake.id,
                    contentType: "quickTake",
                    type: "like",
                  });
                }}
              >
                {isUpvoted ? (
                  <RiThumbUpFill className="text-primary" />
                ) : (
                  <RiThumbUpLine />
                )}
                <span className="text-[9px] md:text-xs">
                  {reactionCounts?.likes}
                </span>
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-foreground ${
                  isDownvoted ? "text-destructive hover:text-destructive" : ""
                }`}
                onClick={() => {
                  toggleReaction({
                    contentId: quickTake.id,
                    contentType: "quickTake",
                    type: "dislike",
                  });
                }}
              >
                {isDownvoted ? (
                  <RiThumbDownFill className="text-destructive" />
                ) : (
                  <RiThumbDownLine />
                )}
                <span className="text-[9px] md:text-xs">
                  {reactionCounts?.dislikes}
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
              <p className="text-[9px] md:text-xs">0</p>
            </Button>

            {/* Share */}
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
            >
              <RiMoreLine />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickTake;
