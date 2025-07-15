"use client";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import Link from "next/link";

function ProfileUsername({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);

  return (
    <>
      {profile?.username ? (
        <Link
          href={`/users/${profile?.username}`}
          className="text-primary hover:underline"
        >
          @{profile?.username}
        </Link>
      ) : isLoading ? (
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      ) : (
        <p className="text-muted-foreground">No username provided.</p>
      )}
    </>
  );
}

export default ProfileUsername;
