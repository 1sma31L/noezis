"use client";
import Post from "@/components/content/Post";
import WhatDoYouThink from "@/components/pages/WhatDoYouThink";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { usePostsByUsername } from "@/lib/hooks/usePostsByUsername";
import { useSession } from "@/lib/hooks/useSession";

function ProfilePosts({ username }: { username: string }) {
  const { data: profile, isLoading } = useProfileByUsername(username);
  const { posts, isLoading: postsLoading } = usePostsByUsername(username);
  const { data: session } = useSession();
  const isOwner = profile?.user.id === session?.user?.id;
  if (postsLoading) return <div>Loading...</div>;
  if (!posts) return <div>No posts found</div>;

  return (
    <div className="flex min-h-screen flex-col items-start justify-start gap-2 md:gap-4">
      {profile && !isLoading && (
        <WhatDoYouThink isOwner={isOwner} />
      )}
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
