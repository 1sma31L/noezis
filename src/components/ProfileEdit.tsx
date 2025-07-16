"use client";
import EditProfileDialog from "./buttons/EditProfileDialog";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

export default function ProfileEdit({ username }: { username: string }) {
  const { data: profile, isOwner } = useProfileByUsername(username);

  if (!profile) return null;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {isOwner && profile && (
        <EditProfileDialog profile={profile} isLoading={false} />
      )}
    </div>
  );
}
