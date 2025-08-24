"use client";

import { api } from "@/trpc/react";
import Post from "./Post";
import Question from "./Question";
import QuickTake from "./QuickTake";
import Answer from "./Answer";
import CommentSection from "./CommentSection";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ContentPageProps {
  contentType: "post" | "question" | "answer" | "quickTake";
  contentId: string;
}

export default function ContentPage({
  contentType,
  contentId,
}: ContentPageProps) {
  const router = useRouter();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Query the appropriate content based on type
  const { data: post, isLoading: postLoading } = api.post.getPost.useQuery(
    { id: contentId },
    { enabled: contentType === "post" },
  );

  const { data: question, isLoading: questionLoading } =
    api.content.getQuestion.useQuery(
      { id: contentId },
      { enabled: contentType === "question" },
    );

  const { data: answer, isLoading: answerLoading } =
    api.content.getAnswer.useQuery(
      { id: contentId },
      { enabled: contentType === "answer" },
    );

  const { data: quickTake, isLoading: quickTakeLoading } =
    api.content.getQuickTake.useQuery(
      { id: contentId },
      { enabled: contentType === "quickTake" },
    );

  const isLoading =
    postLoading || questionLoading || answerLoading || quickTakeLoading;

  const renderContent = () => {
    switch (contentType) {
      case "post":
        if (!post) return <div>Post not found</div>;
        return <Post {...post} />;

      case "question":
        if (!question) return <div>Question not found</div>;
        return <Question {...question} />;

      case "answer":
        if (!answer) return <div>Answer not found</div>;
        return <Answer {...answer} />;

      case "quickTake":
        if (!quickTake) return <div>Quick take not found</div>;
        return <QuickTake {...quickTake} />;

      default:
        return <div>Content not found</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-6">
          {/* Back button skeleton */}
          <div className="bg-muted/30 h-10 w-20 rounded-md" />

          {/* Content skeleton */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              {/* Header skeleton */}
              <div className="flex items-center gap-3">
                <div className="bg-muted/50 h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <div className="bg-muted/50 h-4 w-32 rounded" />
                  <div className="bg-muted/30 h-3 w-24 rounded" />
                </div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="bg-muted/50 h-6 w-3/4 rounded" />
                <div className="bg-muted/30 h-6 w-1/2 rounded" />
              </div>

              {/* Content skeleton */}
              <div className="space-y-3">
                <div className="bg-muted/30 h-4 w-full rounded" />
                <div className="bg-muted/30 h-4 w-full rounded" />
                <div className="bg-muted/30 h-4 w-2/3 rounded" />
              </div>

              {/* Actions skeleton */}
              <div className="flex gap-4 pt-4">
                <div className="bg-muted/30 h-8 w-16 rounded" />
                <div className="bg-muted/30 h-8 w-16 rounded" />
                <div className="bg-muted/30 h-8 w-16 rounded" />
              </div>
            </div>
          </div>

          {/* Comments skeleton */}
          <div className="space-y-4">
            <div className="bg-muted/50 h-6 w-32 rounded" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="bg-muted/50 h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted/50 h-3 w-24 rounded" />
                    <div className="space-y-1">
                      <div className="bg-muted/30 h-4 w-full rounded" />
                      <div className="bg-muted/30 h-4 w-3/4 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const content = post ?? question ?? answer ?? quickTake;
  if (!content) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold">Content not found</h2>
          <p className="text-muted-foreground mb-4">
            The {contentType} you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      {/* Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {renderContent()}

        <Separator />

        {/* Comments Section */}
        <CommentSection contentType={contentType} contentId={contentId} />
      </div>
    </div>
  );
}
