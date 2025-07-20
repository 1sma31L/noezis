"use client";

import { parseBioMentions } from "@/lib/helpers/strings/parseBioMentions";
import { api } from "@/trpc/react";

function ProfileBio({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <>
      {profile?.bio ? (
        <p className="text-muted-foreground max-w-[700px]">
          {parseBioMentions(profile.bio)}
        </p>
      ) : (
        <p className="text-muted-foreground max-w-[700px]">No bio provided.</p>
      )}
    </>
  );
}

export default ProfileBio;
