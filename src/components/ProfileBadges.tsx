"use client";

import { RiCheckboxCircleFill } from "react-icons/ri";
import { GiHeartStake } from "react-icons/gi";
import { api } from "@/trpc/react";

function ProfileBadges({ username }: { username: string }) {
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  return (
    <>
      {profile?.isVerified && (
        <span className="inline align-middle" style={{ whiteSpace: "nowrap" }}>
          &nbsp;
          <RiCheckboxCircleFill
            className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
            style={{
              color: "#2a623d",
              display: "inline-block",
              marginBottom: "0.35rem",
            }}
          />
        </span>
      )}
      {profile?.isLove && (
        <span className="inline align-middle" style={{ whiteSpace: "nowrap" }}>
          &nbsp;
          <GiHeartStake
            className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
            style={{
              color: "#ff009e",
              display: "inline-block",
              marginBottom: "0.35rem",
            }}
          />
        </span>
      )}
    </>
  );
}

export default ProfileBadges;
