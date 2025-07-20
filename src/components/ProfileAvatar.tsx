/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/trpc/react";

function ProfileAvatar({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 md:gap-6">
      {profile?.user.image ? (
        <div className="ring-background flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 md:h-36 md:w-36">
          <img
            src={profile?.user.image}
            alt={profile?.user.name ?? "Profile Image"}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <Avatar className="ring-background h-24 w-24 rounded-full ring-4 md:h-36 md:w-36">
          <AvatarFallback>{profile?.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default ProfileAvatar;
