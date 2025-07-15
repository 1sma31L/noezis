/* eslint-disable @next/next/no-img-element */
"use client";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RiUserLine } from "react-icons/ri";

function ProfileAvatar({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);

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
  );
}

export default ProfileAvatar;
