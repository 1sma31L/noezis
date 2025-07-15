import { RiUserLine } from "react-icons/ri";

function FollowersAndFollowing() {
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <div className="flex flex-row items-center justify-center gap-1">
        <RiUserLine className="h-4 w-4" />
        <p className="text-muted-foreground text-xs md:text-sm">93 followers</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-1">
        <RiUserLine className="h-4 w-4" />
        <p className="text-muted-foreground text-xs md:text-sm">93 following</p>
      </div>
    </div>
  );
}

export default FollowersAndFollowing;
