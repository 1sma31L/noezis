/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { parseBioMentions } from "@/utils/parseBioMentions";
import { useSession } from "@/lib/auth-client";

function UserProfile() {
  const { username } = useParams();
  const { data: session } = useSession();
  const { data: user, isLoading } = api.user.getProfileByUsername.useQuery({
    username: username as string,
  });
  console.log(user);

  const navigationTabs = [
    {
      label: "Posts",
      isActive: true,
    },
    {
      label: "Questions",
      isActive: false,
    },
    {
      label: "Answers",
      isActive: false,
    },
    {
      label: "Comments",
      isActive: false,
    },
  ];

  return (
    <main className="relative flex min-h-[200vh] items-start justify-center px-2">
      {user?.bannerImage ? (
        <div className="absolute z-0 h-40 w-full md:h-48">
          <img
            src={user?.bannerImage}
            alt={user?.user.name ?? "Banner Image"}
            className="h-40 w-full rounded-2xl object-cover md:h-48"
          />
        </div>
      ) : isLoading ? (
        <div className="absolute z-0 h-40 w-full md:h-48">
          <div className="bg-muted h-full w-full animate-pulse rounded-2xl"></div>
        </div>
      ) : (
        <div className="absolute z-0 h-40 w-full md:h-48">
          <div className="bg-primary h-full w-full rounded-2xl"></div>
        </div>
      )}
      <div className="z-10 flex w-full flex-col items-start justify-center gap-2 px-4 pt-24 text-sm md:gap-4 md:text-base">
        <div className="flex w-full flex-col items-start justify-between gap-4 md:gap-6">
          {user?.user.image ? (
            <div className="ring-background flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 md:h-36 md:w-36">
              <img
                src={user?.user.image}
                alt={user?.user.name ?? "Profile Image"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : isLoading ? (
            <Avatar className="ring-background h-24 w-24 animate-pulse rounded-full ring-4 md:h-36 md:w-36">
              <AvatarFallback>
                <Icon icon="mdi:account" className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="ring-background h-24 w-24 rounded-full ring-4 md:h-36 md:w-36">
              <AvatarFallback>{user?.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          {/* NAME */}
          {user?.user.name ? (
            <div className="flex flex-col items-start justify-center">
              <h1 className="inline text-xl leading-tight font-bold break-words lg:text-3xl">
                {user?.user.name}
                {user?.isVerified && (
                  <span
                    className="inline align-middle"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    &nbsp;
                    <Icon
                      icon="solar:verified-check-bold"
                      className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
                      style={{
                        color: "#2a623d",
                        display: "inline-block",
                        marginBottom: "0.35rem",
                      }}
                    />
                  </span>
                )}
              </h1>

              {/* USERNAME */}
              {user?.username ? (
                <Link
                  href={`/users/${user?.username}`}
                  className="text-primary hover:underline"
                >
                  @{user?.username}
                </Link>
              ) : isLoading ? (
                <p className="text-muted-foreground animate-pulse">
                  Loading...
                </p>
              ) : (
                <p className="text-muted-foreground">No username provided.</p>
              )}
            </div>
          ) : isLoading ? (
            <h1 className="animate-pulse text-xl font-bold md:text-4xl">
              Loading...
            </h1>
          ) : (
            <h1 className="text-4xl font-bold">No name</h1>
          )}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 md:gap-4">
          {user?.bio ? (
            <p className="text-muted-foreground max-w-[700px]">
              {parseBioMentions(user.bio)}
            </p>
          ) : isLoading ? (
            <div className="flex flex-row items-center justify-center gap-1 md:gap-2">
              <p className="text-muted-foreground max-w-[700px] animate-pulse">
                Loading...
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground max-w-[700px]">
              No bio provided.
            </p>
          )}
          <div className="flex flex-row items-center justify-start gap-4">
            {user?.location ? (
              <div className="flex w-full flex-row items-center justify-start gap-1">
                <Icon icon="mdi:map-marker" className="h-4 w-4" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  {user?.location}
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-row items-center justify-center gap-1">
                <Icon icon="mdi:map-marker" className="h-4 w-4 animate-pulse" />
                <p className="text-muted-foreground animate-pulse">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-1">
                <Icon icon="mdi:map-marker" className="h-4 w-4" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  No location provided.
                </p>
              </div>
            )}
            {user?.website ? (
              <Link
                href={`https://${user?.website.split("://")[1] ?? user?.website}`}
                target="_blank"
                className="text-muted-foreground flex flex-row items-center justify-start gap-1 text-xs md:text-sm"
              >
                <Icon icon="mdi:web" width="16" height="16" />
                <p className="text-muted-foreground hover:text-primary text-xs hover:underline md:text-sm">
                  {user?.website}
                </p>
              </Link>
            ) : isLoading ? (
              <p className="text-muted-foreground animate-pulse text-xs md:text-sm">
                Loading...
              </p>
            ) : (
              <div className="flex flex-row items-center justify-center gap-1">
                <Icon icon="mdi:web" width="16" height="16" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  No website provided.
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <Icon icon="mdi:calendar" width="16" height="16" />
            <p className="text-muted-foreground text-xs md:text-sm">
              Joined{" "}
              {user?.createdAt.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-center gap-1">
              <Icon icon="mdi:account" width="16" height="16" />
              <p className="text-muted-foreground text-xs md:text-sm">
                93 followers
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <Icon icon="mdi:account" width="16" height="16" />
              <p className="text-muted-foreground text-xs md:text-sm">
                93 following
              </p>
            </div>
          </div>
        </div>

        {/* Only show buttons when session is loaded AND it's not the user's own profile */}
        {session && user?.user?.id && session.user?.id !== user.user.id && (
          <div className="flex flex-row items-center justify-center gap-1 pt-2 md:gap-2">
            <Button className="rounded-full text-xs! md:text-sm!">
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
        )}

        <Separator className="my-2 w-full" />
        <div className="flex h-5 w-full flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4">
          {navigationTabs.map((tab) => (
            <div
              key={tab.label}
              className="flex h-5 flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4"
            >
              <Button
                variant="ghost"
                size="sm"
                key={tab.label}
                className={`${
                  tab.isActive
                    ? "border-primary text-foreground border-b-3"
                    : "text-muted-foreground hover:text-foreground"
                } text-xs md:text-sm`}
              >
                {tab.label}
              </Button>
              <Separator orientation="vertical" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
