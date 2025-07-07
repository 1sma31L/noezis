"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import Link from "next/link";
import { RiUserAddLine, RiCheckboxCircleFill } from "react-icons/ri";

import { type ProfileWithUser } from "@/lib/types/user";

export function ProfileCard({ user }: { user: ProfileWithUser }) {
  return (
    <Card className="relative w-full overflow-hidden pt-0">
      {/* Banner Image with gradient overlay */}
      <div className="aspect-banner relative h-32 w-full">
        <img
          src={user.bannerImage ?? "/hero.jpg"}
          alt={user.user.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Profile Content */}
      <div className="relative -mt-12 px-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="ring-card h-20 w-20 rounded-full ring-4">
            <AvatarImage
              src={user.user.image ?? ""}
              alt={user.user.name}
              className="object-cover"
            />
            <AvatarFallback className="text-lg">
              {user.user.name?.[0]}
            </AvatarFallback>
          </Avatar>

          {/* Follow Button */}
          <Button className="mt-2 ml-auto rounded-full" size="sm">
            <RiUserAddLine className="mr-2 h-4 w-4" />
            Follow
          </Button>
        </div>

        {/* User Info */}
        <div className="mt-3 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Link
              href={`/users/${user.username}`}
              className="text-lg font-semibold hover:underline"
            >
              {user.user.name}
            </Link>
            {user.isVerified && (
              <RiCheckboxCircleFill
                className="h-5 w-5"
                style={{
                  color: "#2a623d",
                }}
              />
            )}
          </div>
          <Link
            href={`/users/${user.username}`}
            className="text-muted-foreground text-sm hover:underline"
          >
            @{user.username}
          </Link>
        </div>

        {/* Bio */}
        <div className="mt-3 pb-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {user.bio ?? "No bio provided."}
          </p>
        </div>
      </div>
    </Card>
  );
}
