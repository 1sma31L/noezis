"use client";
import { useSession } from "@/lib/clients/auth-client";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import EditProfileDialog from "./buttons/EditProfileDialog";

export default function ProfileEdit({ username }: { username: string }) {
  const { data: session } = useSession();
  const { data: profile, isLoading } = useProfileByUsername(username);
  const isOwner = session?.user?.id === profile?.user.id;
  if (!session || !profile) return null;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {isOwner && profile && (
        <EditProfileDialog profile={profile} isLoading={isLoading} />
      )}
    </div>
  );
}
