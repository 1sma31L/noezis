/* FUCKED UP I KNOW */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RiThumbUpLine,
  RiMoreLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
  RiMessage2Line,
  RiShareLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiCheckboxCircleFill,
  RiTwitterXFill,
  RiFacebookFill,
  RiLinkedinFill,
  RiFileCopyLine,
} from "react-icons/ri";

import type { PostWithAuthor } from "@/lib/types/post";
import { generateHTML, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const extensions = [StarterKit, Underline, Link, Typography];

function Post({
  author,
  id,
  title,
  createdAt,
  content,
  thumbnail,
  comments,
  shares,
  tags,
}: PostWithAuthor) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (content) {
      setPostContent(generateHTML(content as JSONContent, extensions));
    }
  }, [content]);

  const wordCount = postContent.trim().split(/\s+/).length;
  const MAX_WORDS = 50;
  const shouldShowMore = wordCount > MAX_WORDS;

  const truncateWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  const { data: reactionStatus, refetch: refetchReactionStatus } =
    api.reaction.getReactionStatus.useQuery(
      {
        postId: id,
      },
      {
        enabled: !!id,
      },
    );
  const { mutate: sharePost } = api.share.sharePost.useMutation({
    onSuccess: () => {
      toast.success("Post shared");
    },
    onError: () => {
      toast.error("Failed to share post");
    },
  });
  const { data: reactionCounts, refetch: refetchReactionCounts } =
    api.reaction.getReactionCounts.useQuery({
      contentId: id,
    });

  const { mutate: toggleReaction } = api.reaction.toggleReaction.useMutation({
    onSuccess: () => {
      toast.success("Reaction toggled");
      // Directly refetch the queries
      void refetchReactionStatus();
      void refetchReactionCounts();
    },
    onError: () => {
      toast.error("Failed to toggle reaction");
    },
  });
  const { mutate: savePost } = api.save.savePost.useMutation({
    onSuccess: () => {
      toast.success("Post saved");
      void refetchSaveStatus();
    },
    onError: () => {
      toast.error("Failed to save post");
    },
  });
  const { data: saveStatus, refetch: refetchSaveStatus } =
    api.save.getSaveStatus.useQuery({
      postId: id,
    });
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      <CardHeader className="flex w-full flex-row items-center justify-start gap-2 md:gap-4">
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage
            src={author.user.image ?? ""}
            alt={author.user.name ?? ""}
          />
          <AvatarFallback className="bg-primary text-background">
            {author.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-1 flex-col items-start justify-start gap-0">
          <p className="flex flex-row items-center justify-start gap-1 text-xs font-medium md:text-base">
            {author.user.name}
            {author.isVerified && (
              <RiCheckboxCircleFill
                style={{
                  color: "#2a623d",
                  display: "inline-block",
                }}
              />
            )}
          </p>
          {author.jobTitle && (
            <p className="text-muted-foreground text-[9px] md:text-xs">
              {author.jobTitle}
            </p>
          )}
        </div>
        <p className="text-muted-foreground text-[9px] md:text-xs">
          {createdAt.toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-start gap-2">
        <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="flex w-full flex-col gap-2">
          <article className="relative">
            <div className="text-muted-foreground w-full text-xs leading-6 sm:text-sm md:text-base">
              {isMounted ? (
                <div
                  className="prose dark:prose-invert prose-green max-w-4xl"
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? postContent
                      : truncateWords(postContent, MAX_WORDS),
                  }}
                />
              ) : (
                <div className="bg-muted h-20 animate-pulse rounded-md" />
              )}
            </div>
            {!isExpanded && shouldShowMore && isMounted && (
              <div
                className="absolute right-0 bottom-0 left-0 h-24"
                style={{
                  background:
                    "linear-gradient(to top, var(--card), transparent)",
                }}
              />
            )}
          </article>

          {shouldShowMore && isMounted && (
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
          {tags?.map((tag) => (
            <Badge
              key={tag}
              className="bg-accent text-muted-foreground text-[9px] md:text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-2 pt-4">
          <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
            {/* Voting */}
            <div className="bg-muted/50 flex h-8 flex-row items-center justify-start gap-2 rounded-full px-2">
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-foreground flex flex-row items-center justify-start gap-2 ${
                  reactionStatus?.hasReacted &&
                  reactionStatus?.reactionType === "like"
                    ? "text-primary hover:text-primary"
                    : ""
                }`}
                onClick={() => {
                  toggleReaction({ postId: id, type: "like" });
                }}
              >
                {reactionStatus?.hasReacted &&
                reactionStatus?.reactionType === "like" ? (
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
                  reactionStatus?.hasReacted &&
                  reactionStatus?.reactionType === "dislike"
                    ? "text-destructive hover:text-destructive"
                    : ""
                }`}
                onClick={() => {
                  toggleReaction({ postId: id, type: "dislike" });
                }}
              >
                {reactionStatus?.hasReacted &&
                reactionStatus?.reactionType === "dislike" ? (
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
              <p className="text-[9px] md:text-xs">{comments}</p>
            </Button>

            {/* Share */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hidden md:flex"
                >
                  <RiShareLine />
                  {shares && <p className="text-[9px] md:text-xs">{shares}</p>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Share Post</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const url = `${window.location.origin}/posts/${id}`;
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
                      "_blank",
                    );

                    sharePost({ postId: id });
                  }}
                >
                  <RiTwitterXFill className="mr-2" /> Twitter
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const url = `${window.location.origin}/posts/${id}`;
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                      "_blank",
                    );
                    sharePost({ postId: id });
                  }}
                >
                  <RiFacebookFill className="mr-2" /> Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const url = `${window.location.origin}/posts/${id}`;
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                      "_blank",
                    );
                    sharePost({ postId: id });
                  }}
                >
                  <RiLinkedinFill className="mr-2" /> LinkedIn
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const url = `${window.location.origin}/posts/${id}`;
                    void navigator.clipboard.writeText(url);
                    toast.success("Link copied to clipboard");
                    sharePost({ postId: id });
                  }}
                >
                  <RiFileCopyLine className="mr-2" /> Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Save + Settings */}
          <div className="flex flex-row items-center justify-start gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                savePost({ postId: id });
                void refetchSaveStatus();
              }}
            >
              {saveStatus?.isSaved ? (
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

export default Post;
