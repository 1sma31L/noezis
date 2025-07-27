"use client";

import React, { useState } from "react";
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

interface QuickTakeProps {
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
  shares: number;
  tags: string[];
  comments: number;
}

function QuickTake({
  id,
  content,
  user,
  date,
  upvotes,
  downvotes,
  shares,
  tags,
  comments,
}: QuickTakeProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      <ContentHeader
        image={user.image ?? ""}
        name={user.name ?? ""}
        jobTitle={user.job ?? ""}
        isVerified={user.isVerified}
        createdAt={date}
        type="quickTake"
      />

      <CardContent>
        <p className="text-xs leading-6 sm:text-sm md:text-base">{content}</p>
        <ContentTags tags={tags} />

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
                  if (isDownvoted) setIsDownvoted(false);
                  setIsUpvoted(!isUpvoted);
                }}
              >
                {isUpvoted ? (
                  <RiThumbUpFill className="text-primary" />
                ) : (
                  <RiThumbUpLine />
                )}
                <span className="text-[9px] md:text-xs">{upvotes}</span>
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
                <span className="text-[9px] md:text-xs">{downvotes}</span>
              </Button>
            </div>

            {/* Comments */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <RiMessage2Line />
              {comments && <p className="text-[9px] md:text-xs">{comments}</p>}
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <RiShareLine />
              {shares && <p className="text-[9px] md:text-xs">{shares}</p>}
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

export default QuickTake;
