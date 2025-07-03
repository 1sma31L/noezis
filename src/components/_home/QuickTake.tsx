"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

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
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2 md:gap-4">
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="bg-primary text-background">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-muted-foreground text-xs">{user.job}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-accent text-accent-foreground rounded-full"
        >
          <Icon icon="mdi:lightning-bolt" className="mr-1 inline-block" />
          Quick Take
        </Badge>
        <p className="text-muted-foreground text-xs">{date}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7">{content}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-accent/50 text-accent-foreground text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          {/* Voting */}
          <div className="bg-muted/50 flex h-8 flex-row items-center justify-start gap-2 rounded-full px-2">
            <Button
              variant="ghost"
              size="sm"
              className={`text-muted-foreground hover:text-foreground flex flex-row items-center justify-start gap-2 ${
                isUpvoted ? "text-blue-500 hover:text-blue-500" : ""
              }`}
              onClick={() => {
                if (isDownvoted) setIsDownvoted(false);
                setIsUpvoted(!isUpvoted);
              }}
            >
              <Icon icon="mdi:thumb-up" />
              {upvotes && <span className="text-xs">{upvotes}</span>}
            </Button>
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
              <Icon icon="mdi:thumb-down" />
              {downvotes && <span className="text-xs">{downvotes}</span>}
            </Button>
          </div>

          {/* Comments */}

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon icon="mdi:comment-multiple" />
            {comments && <p className="text-xs">{comments}</p>}
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
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
              className={isSaved ? "text-primary" : ""}
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
      </CardFooter>
    </Card>
  );
}

export default QuickTake;
