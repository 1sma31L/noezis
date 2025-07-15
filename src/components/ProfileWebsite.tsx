"use client";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { RiGlobalLine } from "react-icons/ri";
import Link from "next/link";

function ProfileWebsite({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);

  return (
    <>
      {profile?.website ? (
        <Link
          href={`https://${profile?.website.split("://")[1] ?? profile?.website}`}
          target="_blank"
          className="text-muted-foreground flex flex-row items-center justify-start gap-1 text-xs md:text-sm"
        >
          <RiGlobalLine className="h-4 w-4" />
          <p className="text-muted-foreground hover:text-primary text-xs hover:underline md:text-sm">
            {profile?.website}
          </p>
        </Link>
      ) : isLoading ? (
        <p className="text-muted-foreground animate-pulse text-xs md:text-sm">
          Loading...
        </p>
      ) : (
        <div className="flex flex-row items-center justify-start gap-1">
          <RiGlobalLine className="h-4 w-4" />
          <p className="text-muted-foreground text-xs md:text-sm">
            No website provided.
          </p>
        </div>
      )}
    </>
  );
}

export default ProfileWebsite;
