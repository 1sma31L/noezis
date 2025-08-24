"use client";

import { Card, CardContent } from "@/components/ui/card";

import ContentTags from "./ContentTags";
import ContentHeader from "./ContentHeader";
import type { QuickTakeWithAuthor } from "@/lib/types/quickTake";
import ContentFooter from "./ContentFooter";

function QuickTake(quickTake: QuickTakeWithAuthor) {
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-4 md:gap-6">
      <ContentHeader
        image={quickTake.author.user.image ?? ""}
        name={quickTake.author.user.name ?? ""}
        jobTitle={quickTake.author.jobTitle ?? ""}
        isVerified={quickTake.author.isVerified}
        createdAt={quickTake.createdAt.toDateString()}
        type="quickTake"
        username={quickTake.author.username}
      />

      <CardContent className="flex w-full flex-col items-start justify-start gap-1">
        <p className="text-xs leading-6 sm:text-sm md:text-base">
          {quickTake.content}
        </p>
        <ContentTags tags={quickTake.tags} />

        <ContentFooter
          id={quickTake.id}
          title={quickTake.content}
          type="quickTake"
          comments={quickTake.comments}
        />
      </CardContent>
    </Card>
  );
}

export default QuickTake;
