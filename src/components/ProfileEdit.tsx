"use client";
import { useSession } from "@/lib/clients/auth-client";
import EditProfileDialog from "./buttons/EditProfileDialog";
import { api } from "@/trpc/react";

export default function ProfileEdit({ username }: { username: string }) {
  const { data: session } = useSession();
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  const isOwner = session?.user?.id === profile?.user.id;
  if (!session || !profile) return null;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {isOwner && profile && (
        <EditProfileDialog profile={profile} isLoading={false} />
      )}
    </div>
  );
}
