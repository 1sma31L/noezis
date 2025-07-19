"use client";

import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { api } from "@/trpc/react";

function ProfileLocation({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <>
      {profile?.location ? (
        <div className="flex flex-row items-center justify-start gap-1">
          <RiMapPin2Fill className="h-4 w-4" />
          <p className="text-muted-foreground text-xs md:text-sm">
            {profile?.location}
          </p>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-1">
          <RiMapPin2Line className="h-4 w-4" />
          <p className="text-muted-foreground text-xs md:text-sm">
            No location provided.
          </p>
        </div>
      )}
    </>
  );
}

export default ProfileLocation;
