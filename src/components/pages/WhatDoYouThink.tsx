"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/lib/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  RiFireLine,
  RiQuestionLine,
  RiMessage2Line,
  RiMessage3Line,
} from "react-icons/ri";
import CreateContentDialog from "./CreateContentDialog";

function WhatDoYouThink() {
  const { profile } = useProfile();
  return (
    <Card className="w-full px-1">
      <CardContent className="flex flex-col items-center justify-start gap-6">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <Link
            href={`/users/${profile?.username}`}
            className="flex items-center"
          >
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage
                src={profile?.user.image ?? undefined}
                alt={profile?.user.name ?? "User avatar"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary">
                {profile?.user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <CreateContentDialog
              trigger={
                <Button
                  variant="outline"
                  className="text-muted-foreground w-full !justify-start rounded-full"
                >
                  What do you think?
                </Button>
              }
              defaultType="quickTake"
            />
          </div>
        </div>
        <div className="flex h-5 w-full flex-row items-center justify-between gap-1 sm:justify-center md:gap-2">
          <CreateContentDialog
            trigger={
              <Button
                variant="ghost"
                size={"sm"}
                className="!px-1 text-xs sm:!px-2 md:text-sm"
              >
                <RiFireLine className="!h-3 !w-3" />
                <p>Quick Take</p>
              </Button>
            }
            defaultType="quickTake"
          />
          <Separator orientation="vertical" />
          <CreateContentDialog
            trigger={
              <Button
                variant="ghost"
                size={"sm"}
                className="!px-1 text-xs sm:!px-2 md:text-sm"
              >
                <RiQuestionLine className="!h-3 !w-3" />
                <p>Ask</p>
              </Button>
            }
            defaultType="question"
          />
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            size={"sm"}
            className="!px-1 text-xs sm:!px-2 md:text-sm"
          >
            <Link href="/explore#questions" className="flex items-center gap-1">
              <RiMessage2Line className="!h-3 !w-3" />
              <p>Answer</p>
            </Link>
          </Button>
          <Separator orientation="vertical" />{" "}
          <Button
            variant="ghost"
            size={"sm"}
            asChild
            className="!px-1 text-xs sm:!px-2 md:text-sm"
          >
            <Link href="/posts/create" className="flex items-center gap-1">
              <RiMessage3Line className="!h-3 !w-3" />
              <p>Post</p>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WhatDoYouThink;
