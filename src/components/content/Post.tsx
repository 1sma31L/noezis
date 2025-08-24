/* FUCKED UP I KNOW */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { PostWithAuthor } from "@/lib/types/post";
import { generateHTML, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";

import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import useExpanded from "@/lib/hooks/useExpanded";

const extensions = [StarterKit, Underline, Link, Typography];

function Post({
  author,
  id,
  title,
  createdAt,
  content,
  thumbnail,
  tags,
}: PostWithAuthor) {
  const [postContent, setPostContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (content) {
      setPostContent(generateHTML(content as JSONContent, extensions));
    }
  }, [content]);

  const {
    isExpanded,
    setIsExpanded,
    shouldShowMore,
    truncateWords,
    MAX_WORDS,
  } = useExpanded(postContent as string, false);

  // const { mutate: sharePost } = api.share.sharePost.useMutation({
  //   onSuccess: () => {
  //     toast.success("Post shared");
  //   },
  //   onError: () => {
  //     toast.error("Failed to share post");
  //   },
  // });

  // const { mutate: savePost } = api.save.savePost.useMutation({
  //   onSuccess: () => {
  //     toast.success("Post saved");
  //     void refetchSaveStatus();
  //   },
  //   onError: () => {
  //     toast.error("Failed to save post");
  //   },
  // });
  // const { data: saveStatus, refetch: refetchSaveStatus } =
  //   api.save.getSaveStatus.useQuery({
  //     postId: id,
  //   });
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      <ContentHeader
        image={author.user.image ?? ""}
        name={author.user.name ?? ""}
        jobTitle={author.jobTitle ?? ""}
        isVerified={author.isVerified}
        createdAt={createdAt.toDateString()}
        type="post"
        username={author.username}
      />

      <CardContent className="flex w-full flex-col items-start justify-start gap-2">
        <CardTitle className="text-base font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="flex w-full flex-col gap-2">
          <article className="relative">
            <div className="text-muted-foreground w-full text-xs leading-6 sm:text-sm md:text-base">
              {isMounted ? (
                <div
                  className="prose prose-sm dark:prose-invert prose-green sm:prose-sm md:prose-base max-w-full"
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
          <div className="w-full">
            <img
              src={thumbnail}
              alt={title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <ContentTags tags={tags} />

        <ContentFooter id={id} title={title} type="post" />
      </CardContent>
    </Card>
  );
}

export default Post;
