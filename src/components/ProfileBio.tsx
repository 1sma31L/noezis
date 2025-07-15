"use client";
import { parseBioMentions } from "@/lib/helpers/strings/parseBioMentions";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function ProfileBio({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);

  return (
    <>
      {profile?.bio ? (
        <p className="text-muted-foreground max-w-[700px]">
          {parseBioMentions(profile.bio)}
        </p>
      ) : isLoading ? (
        <div className="flex flex-row items-center justify-center gap-1 md:gap-2">
          <p className="text-muted-foreground max-w-[700px] animate-pulse">
            Loading...
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground max-w-[700px]">No bio provided.</p>
      )}
    </>
  );
}

export default ProfileBio;
