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
import { Suspense } from "react";
import { api } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

type userProfileProps = {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
};

async function UserProfile({ params, children }: userProfileProps) {
  const { username } = await params;
  await api.user.getProfileByUsername.prefetch({ username });

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
    // <HydrateClient>
    <main className="relative flex flex-col items-start justify-center gap-4 md:gap-6">
      <div className="flex w-full flex-col items-start justify-center gap-2 px-2 pt-24 text-sm md:gap-4 md:px-4 md:text-base">
        <ErrorBoundary fallback={<p>Error loading profile...</p>}>
          <Suspense fallback={<p>Loading banner...</p>}>
            <ProfileBanner username={username} />
          </Suspense>
          <Suspense fallback={<p>Loading avatar...</p>}>
            <ProfileAvatar username={username} />
          </Suspense>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-col items-start justify-center">
              <h1 className="inline text-xl leading-tight font-bold break-words lg:text-3xl">
                <Suspense fallback={<p>Loading name...</p>}>
                  <ProfileName username={username} />
                </Suspense>
                <Suspense fallback={<p>Loading badges...</p>}>
                  <ProfileBadges username={username} />
                </Suspense>
              </h1>
              <Suspense fallback={<p>Loading username...</p>}>
                <ProfileUsername username={username} />
              </Suspense>
            </div>
            <Suspense fallback={<p>Loading edit button...</p>}>
              <ProfileEdit username={username} />
            </Suspense>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2 md:gap-4">
            <Suspense fallback={<p>Loading bio...</p>}>
              <ProfileBio username={username} />
            </Suspense>
            <div className="flex w-full flex-row items-center justify-start gap-4">
              <Suspense fallback={<p>Loading location...</p>}>
                <ProfileLocation username={username} />
              </Suspense>
              <Suspense fallback={<p>Loading website...</p>}>
                <ProfileWebsite username={username} />
              </Suspense>
            </div>
          </div>
          <FollowersAndFollowing />
          <Suspense fallback={<p>Loading contact...</p>}>
            <ContactProfile username={username} />
          </Suspense>
          <Separator className="my-2 w-full" />
          <ProfileTabs navigationTabs={navigationTabs} />
        </ErrorBoundary>
      </div>

      <div className="w-full">{children}</div>
    </main>
    // </HydrateClient>
  );
}

export default UserProfile;
