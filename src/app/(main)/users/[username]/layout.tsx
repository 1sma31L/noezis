import { Separator } from "@/components/ui/separator";
import ProfileTabs from "@/components/ProfileTabs";
import ContactProfile from "@/components/ContactProfile";
import FollowersAndFollowing from "@/components/FollowersAndFollowing";
import ProfileWebsite from "@/components/ProfileWebsite";
import ProfileLocation from "@/components/ProfileLocation";
import ProfileBio from "@/components/ProfileBio";
import ProfileBadges from "@/components/ProfileBadges";
import ProfileUsername from "@/components/ProfileUsername";
import ProfileEdit from "@/components/ProfileEdit";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileBanner from "@/components/ProfileBanner";
import ProfileName from "@/components/ProfileName";

async function UserProfile({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}) {
  const { username } = await params;

  const navigationTabs = [
    {
      label: "All",
      href: `/users/${username}`,
    },
    {
      label: "Posts",
      href: `/users/${username}/posts`,
    },
    {
      label: "Questions",
      href: `/users/${username}/questions`,
    },
    {
      label: "Answers",
      href: `/users/${username}/answers`,
    },
    {
      label: "Comments",
      href: `/users/${username}/comments`,
    },
  ];

  return (
    <main className="relative flex flex-col items-start justify-center gap-4 md:gap-6">
      <div className="flex w-full flex-col items-start justify-center gap-2 px-2 pt-24 text-sm md:gap-4 md:px-4 md:text-base">
        <ProfileBanner username={username} />
        <ProfileAvatar username={username} />
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-col items-start justify-center">
            <h1 className="inline text-xl leading-tight font-bold break-words lg:text-3xl">
              <ProfileName username={username} />
              <ProfileBadges username={username} />
            </h1>
            <ProfileUsername username={username} />
          </div>
          {/* TODO: fix revalidation  */}
          <ProfileEdit username={username} />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2 md:gap-4">
          <ProfileBio username={username} />
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <ProfileLocation username={username} />
            <ProfileWebsite username={username} />
          </div>
        </div>
        <FollowersAndFollowing />
        <ContactProfile username={username} />
        <Separator className="my-2 w-full" />
        <ProfileTabs navigationTabs={navigationTabs} />
      </div>
      <div className="w-full">{children}</div>
    </main>
  );
}

export default UserProfile;
