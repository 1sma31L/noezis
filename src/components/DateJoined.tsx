import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { RiCalendarLine } from "react-icons/ri";

function DateJoined({ username }: { username: string }) {
  const { data: profile } = useProfileByUsername(username);
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <RiCalendarLine className="h-4 w-4" />
      <p className="text-muted-foreground text-xs md:text-sm">
        Joined{" "}
        {profile?.createdAt.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

export default DateJoined;
