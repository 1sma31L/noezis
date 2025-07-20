"use client";

import Link from "next/link";
import { api } from "@/trpc/react";

function ProfileUsername({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <>
      {profile?.username ? (
        <Link
          href={`/users/${profile?.username}`}
          className="text-primary hover:underline"
        >
          @{profile?.username}
        </Link>
      ) : (
        <p className="text-muted-foreground">No username provided.</p>
      )}
    </>
  );
}

export default ProfileUsername;
