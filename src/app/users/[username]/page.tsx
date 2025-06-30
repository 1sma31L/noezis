/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function UserProfile() {
  const { username } = useParams();
  const { data: user, isLoading } = api.user.getUserByUsername.useQuery({
    username: username as string,
  });
  console.log(user);
  return (
    <main className="relative container mx-auto flex min-h-[300vh] items-start justify-center pt-20">
      {user?.bannerImage ? (
        <div className="absolute z-0 h-48 w-full">
          <img
            src={user?.bannerImage}
            alt={user?.user.name ?? "Banner Image"}
            className="h-48 w-full rounded-2xl object-cover"
          />
        </div>
      ) : (
        <div className="bg-primary absolute z-0 h-48 w-full rounded-2xl"></div>
      )}
      <div className="z-10 flex w-full flex-col items-start justify-center gap-6 px-12 pt-24">
        <div className="flex w-full flex-col items-start justify-between gap-6">
          {user?.user.image ? (
            <img
              src={user?.user.image}
              alt={user?.user.name ?? "Profile Image"}
              className="ring-background h-36 w-36 rounded-full ring-4"
            />
          ) : isLoading ? (
            <Avatar className="ring-background h-36 w-36 animate-pulse rounded-full ring-4">
              <AvatarFallback>
                <Icon icon="mdi:account" className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="ring-background h-36 w-36 rounded-full ring-4">
              <AvatarFallback>{user?.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          {user?.user.name ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <h1 className="text-4xl font-bold">{user?.user.name}</h1>
              {user?.isVerified && (
                <Icon
                  icon="solar:verified-check-bold"
                  width="32"
                  height="32"
                  style={{ color: "#2a623d" }}
                />
              )}
            </div>
          ) : isLoading ? (
            <h1 className="animate-pulse text-4xl font-bold">Loading...</h1>
          ) : (
            <h1 className="text-4xl font-bold">No name</h1>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-4">
          {user?.bio ? (
            <p className="text-muted-foreground max-w-[700px]">{user?.bio}</p>
          ) : isLoading ? (
            <p className="text-muted-foreground max-w-[700px] animate-pulse">
              Loading...
            </p>
          ) : (
            <p className="text-muted-foreground max-w-[700px]">
              No bio provided.
            </p>
          )}
          <div className="flex flex-row items-center justify-start gap-4">
            {user?.location ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:map-marker" className="h-4 w-4" />
                <p className="text-muted-foreground">{user?.location}</p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:map-marker" className="h-4 w-4 animate-pulse" />
                <p className="text-muted-foreground animate-pulse">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:map-marker" className="h-4 w-4" />
                <p className="text-muted-foreground">No location provided.</p>
              </div>
            )}
            {user?.website ? (
              <a href={user?.website} className="text-muted-foreground">
                <Icon icon="mdi:web" width="16" height="16" />
                {user?.website}
              </a>
            ) : isLoading ? (
              <p className="text-muted-foreground animate-pulse">Loading...</p>
            ) : (
              <div className="flex flex-row items-center justify-center gap-2">
                <Icon icon="mdi:web" width="16" height="16" />
                <p className="text-muted-foreground">No website provided.</p>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Icon icon="mdi:calendar" width="16" height="16" />
            <p className="text-muted-foreground">
              Joined{" "}
              {user?.createdAt.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <Icon icon="mdi:account" width="16" height="16" />
              <p className="text-muted-foreground">93 followers</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <Icon icon="mdi:account" width="16" height="16" />
              <p className="text-muted-foreground">93 following</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <Button className="rounded-full">
            <Icon icon="mdi:account-plus" className="h-4 w-4" />
            Follow
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Icon icon="mdi:message-outline" className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon icon="mdi:dots-vertical" className="h-4 w-4" />
          </Button>
        </div>
        <Separator className="my-2 w-full" />
        <div className="flex w-full flex-row items-center justify-start gap-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="border-primary text-foreground border-b-3"
            >
              Posts
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Questions
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Answers
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Comments
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
