/* eslint-disable @next/next/no-img-element */
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface PostProps {
  user: {
    id: number;
    name: string;
    username: string;
    image: string;
    job: string;
    isVerified: boolean;
  };
  id: number;
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
  views: number;
  tags: string[];
}
function Post({
  user,
  id,
  title,
  date,
  content,
  thumbnail,
  upvotes,
  downvotes,
  comments,
  shares,
  views,
  tags,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordCount = content.trim().split(/\s+/).length;
  const MAX_WORDS = 50;
  const shouldShowMore = wordCount > MAX_WORDS;

  const truncateWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ");
  };

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
        <p className="text-muted-foreground text-xs">{date}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start gap-2">
        <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="flex w-full flex-col gap-2">
          <div className="relative">
            <p className="text-muted-foreground text-xs leading-7 sm:text-sm md:text-base">
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
          {/* IMAGE */}

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
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="rounded-lg object-cover"
          />
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-accent text-muted-foreground text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-start gap-1 md:gap-2">
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
            <Icon icon="mdi:message" />

            {comments && <p className="text-xs">{comments}</p>}
          </Button>
          {/* SHARE */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon icon="mdi:share" />
            {shares && <p className="text-xs">{shares}</p>}
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
            <Icon
              icon="mdi:bookmark"
              className={isSaved ? "text-yellow-500 hover:text-yellow-500" : ""}
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

export default Post;
