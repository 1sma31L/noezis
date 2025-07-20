"use client";
import { RiUserAddLine, RiMessageLine, RiMoreLine } from "react-icons/ri";
import { Button } from "./ui/button";
import { useProfileByUsername } from "@/lib/hooks/useProfile";

function ContactProfile({ username }: { username: string }) {
  const { data: profile, isOwner } = useProfileByUsername(username);
  if (!profile) return null;

  return (
    <>
      {!isOwner && (
        <div className="flex flex-row items-center justify-center gap-2 pt-2 md:gap-4">
          {" "}
          <Button className="rounded-full text-xs! md:text-sm!">
            <RiUserAddLine className="h-4 w-4" />
            Follow
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <RiMessageLine className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <RiMoreLine className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}

export default ContactProfile;
