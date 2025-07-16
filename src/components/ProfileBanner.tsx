/* eslint-disable @next/next/no-img-element */
"use client";

import { ANONYMOUS_BANNER_IMAGE } from "@/lib/constants";
import { api } from "@/trpc/react";

function ProfileBanner({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <div className="aspect-banner absolute top-0 right-0 -z-10 h-40 w-full md:h-48">
      <img
        src={profile?.bannerImage ?? ANONYMOUS_BANNER_IMAGE}
        alt={profile?.user.name ?? "Banner Image"}
        className="h-40 w-full rounded-2xl object-cover md:h-48"
      />
    </div>
  );
}

export default ProfileBanner;
