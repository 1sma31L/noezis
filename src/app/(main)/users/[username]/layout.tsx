/* eslint-disable @next/next/no-img-element */
"use client";
import React, { use, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { parseBioMentions } from "@/lib/helpers/strings/parseBioMentions";
import {
  RiGlobalLine,
  RiUserLine,
  RiUserAddLine,
  RiMessageLine,
  RiMoreLine,
  RiCalendarLine,
  RiCheckboxCircleFill,
  RiMapPin2Fill,
  RiMapPin2Line,
  RiHeartFill,
  RiHeart2Fill,
} from "react-icons/ri";
import { useSession } from "@/lib/clients/auth-client";
import { useInitProfileByUsername } from "@/lib/hooks/useInitProfile";
import EditProfileDialog from "@/components/buttons/EditProfileDialog";
import { ANONYMOUS_BANNER_IMAGE } from "@/lib/constants";
import ProfileTabs from "@/components/ProfileTabs";
import { useVisitedProfile } from "@/lib/hooks/useVisitedProfile";
import { GiHeartStake } from "react-icons/gi";

function UserProfile({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}) {
  const { username } = use(params);
  const { data: session } = useSession();
  const { data: fetchedProfile, isLoading: isProfileLoading } =
    useInitProfileByUsername(username);

  const {
    setVisitedProfile,
    visitedProfile: profile,
    isLoading,
    setIsLoading,
    isOwner,
    setIsOwner,
  } = useVisitedProfile();

  useEffect(() => {
    setIsLoading(isProfileLoading);

    if (!isProfileLoading && fetchedProfile) {
      setVisitedProfile(fetchedProfile);
      setIsOwner(session?.user?.id === fetchedProfile.user.id);
    }

    return () => {
      setVisitedProfile(null);
      setIsOwner(false);
      setIsLoading(false);
    };
  }, [
    session?.user,
    isProfileLoading,
    fetchedProfile,
    setIsOwner,
    setVisitedProfile,
    setIsLoading,
  ]);

  const navigationTabs = [
    {
      label: "All",
      href: `/users/${username}`,
    },
    {
      label: "Posts",
      href: `/users/${username}/posts`,
    },
    {
      label: "Questions",
      href: `/users/${username}/questions`,
    },
    {
      label: "Answers",
      href: `/users/${username}/answers`,
    },
    {
      label: "Comments",
      href: `/users/${username}/comments`,
    },
  ];

  return (
    <main className="relative flex flex-col items-start justify-center gap-4 md:gap-6">
      <div className="flex w-full flex-col items-start justify-center gap-2 px-2 pt-24 text-sm md:gap-4 md:px-4 md:text-base">
        {!isLoading && profile && (
          <div className="aspect-banner absolute top-0 right-0 -z-10 h-40 w-full md:h-48">
            <img
              src={profile?.bannerImage ?? ANONYMOUS_BANNER_IMAGE}
              alt={profile?.user.name ?? "Banner Image"}
              className="h-40 w-full rounded-2xl object-cover md:h-48"
            />
          </div>
        )}
        <div className="flex w-full flex-col items-start justify-between gap-4 md:gap-6">
          {profile?.user.image ? (
            <div className="ring-background flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 md:h-36 md:w-36">
              <img
                src={profile?.user.image}
                alt={profile?.user.name ?? "Profile Image"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : isLoading ? (
            <Avatar className="ring-background h-24 w-24 animate-pulse rounded-full ring-4 md:h-36 md:w-36">
              <AvatarFallback>
                <RiUserLine className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="ring-background h-24 w-24 rounded-full ring-4 md:h-36 md:w-36">
              <AvatarFallback>{profile?.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="flex w-full flex-row items-center justify-between gap-2">
          {/*  */}
          {/* NAME */}
          {profile?.user.name ? (
            <div className="flex flex-col items-start justify-center">
              <h1 className="inline text-xl leading-tight font-bold break-words lg:text-3xl">
                {profile?.user.name}
                {profile?.isVerified && (
                  <span
                    className="inline align-middle"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    &nbsp;
                    <RiCheckboxCircleFill
                      className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
                      style={{
                        color: "#2a623d",
                        display: "inline-block",
                        marginBottom: "0.35rem",
                      }}
                    />
                  </span>
                )}
                {profile?.isLove && (
                  <span
                    className="inline align-middle"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    &nbsp;
                    <GiHeartStake
                      className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                      style={{
                        color: "#ff009e",
                        display: "inline-block",
                        marginBottom: "0.35rem",
                      }}
                    />
                  </span>
                )}
              </h1>

              {/* USERNAME */}
              {profile?.username ? (
                <Link
                  href={`/users/${profile?.username}`}
                  className="text-primary hover:underline"
                >
                  @{profile?.username}
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
          {/* EDIT PROFILE */}
          <div className="flex flex-row items-center justify-center gap-2">
            {isOwner && profile && (
              <EditProfileDialog profile={profile} isLoading={isLoading} />
            )}
          </div>
          {/*  */}
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2 md:gap-4">
          {profile?.bio ? (
            <p className="text-muted-foreground max-w-[700px]">
              {parseBioMentions(profile.bio)}
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
          <div className="flex w-full flex-row items-center justify-start gap-4">
            {profile?.location ? (
              <div className="flex flex-row items-center justify-start gap-1">
                <RiMapPin2Fill className="h-4 w-4" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  {profile?.location}
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-row items-center justify-center gap-1">
                <RiMapPin2Fill className="h-4 w-4 animate-pulse" />
                <p className="text-muted-foreground animate-pulse">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-1">
                <RiMapPin2Line className="h-4 w-4" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  No location provided.
                </p>
              </div>
            )}
            {profile?.website ? (
              <Link
                href={`https://${profile?.website.split("://")[1] ?? profile?.website}`}
                target="_blank"
                className="text-muted-foreground flex flex-row items-center justify-start gap-1 text-xs md:text-sm"
              >
                <RiGlobalLine className="h-4 w-4" />
                <p className="text-muted-foreground hover:text-primary text-xs hover:underline md:text-sm">
                  {profile?.website}
                </p>
              </Link>
            ) : isLoading ? (
              <p className="text-muted-foreground animate-pulse text-xs md:text-sm">
                Loading...
              </p>
            ) : (
              <div className="flex flex-row items-center justify-start gap-1">
                <RiGlobalLine className="h-4 w-4" />
                <p className="text-muted-foreground text-xs md:text-sm">
                  No website provided.
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <RiCalendarLine className="h-4 w-4" />
            <p className="text-muted-foreground text-xs md:text-sm">
              Joined{" "}
              {profile?.createdAt.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-center gap-1">
              <RiUserLine className="h-4 w-4" />
              <p className="text-muted-foreground text-xs md:text-sm">
                93 followers
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <RiUserLine className="h-4 w-4" />
              <p className="text-muted-foreground text-xs md:text-sm">
                93 following
              </p>
            </div>
          </div>
        </div>

        {/* Only show buttons when session is loaded AND it's not the user's own profile */}
        {!isOwner && profile && (
          <div className="flex flex-row items-center justify-center gap-2 pt-2 md:gap-4">
            <Button className="rounded-full text-xs! md:text-sm!">
              <RiUserAddLine className="h-4 w-4" />
              Follow
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <RiMessageLine className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <RiMoreLine className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Separator className="my-2 w-full" />
        <ProfileTabs navigationTabs={navigationTabs} />
      </div>
      {/* WhatDoYouWantToAsk */}

      <div className="w-full">{children}</div>
    </main>
  );
}

export default UserProfile;
