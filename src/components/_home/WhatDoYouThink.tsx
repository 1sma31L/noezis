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

function WhatDoYouThink() {
  const { data: profile } = useProfile();
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
                src={profile?.user.image ?? ""}
                alt={profile?.user.name ?? "User avatar"}
              />
              <AvatarFallback className="bg-primary">
                {profile?.user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Button
              variant="outline"
              className="text-muted-foreground w-full !justify-start rounded-full"
            >
              What do you think?
            </Button>
          </div>
        </div>
        <div className="flex h-5 w-full flex-row items-center justify-center gap-2 md:gap-4">
          <Button variant="ghost" size={"sm"}>
            <RiFireLine className="hidden md:block" />
            <p>Quick Take</p>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size={"sm"}>
            <RiQuestionLine className="hidden md:block" />
            <p>Ask</p>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size={"sm"}>
            <RiMessage2Line className="hidden md:block" />
            <p>Answer</p>
          </Button>
          <Separator orientation="vertical" />{" "}
          <Button variant="ghost" size={"sm"}>
            <RiMessage3Line className="hidden md:block" />
            <p>Post</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WhatDoYouThink;
