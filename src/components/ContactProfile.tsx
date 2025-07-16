"use client";
import { RiUserAddLine, RiMessageLine, RiMoreLine } from "react-icons/ri";
import { Button } from "./ui/button";
import { useSession } from "@/lib/clients/auth-client";
import { api } from "@/trpc/react";

function ContactProfile({ username }: { username: string }) {
  const { data: session } = useSession();
  const [profile] = api.user.getProfileByUsername.useSuspenseQuery({
    username,
  });
  const isOwner = session?.user?.id === profile?.user.id;
  if (!session || !profile) return null;

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
