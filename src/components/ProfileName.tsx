"use client";
import { api } from "@/trpc/react";

function ProfileName({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return <>{profile?.user.name}</>;
}

export default ProfileName;
