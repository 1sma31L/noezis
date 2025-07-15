"use client";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function ProfileName({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);

  return <>{profile?.user.name}</>;
}

export default ProfileName;
