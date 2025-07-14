"use client";
import React, { use } from "react";
import Post from "@/components/pages/home/Post";
import { useProfileByUsername } from "@/lib/hooks/useProfile";
import { api } from "@/trpc/react";

function UserPosts({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: profile, isLoading } = useProfileByUsername(username);
  const { data: posts, isLoading: postsLoading } =
    api.post.getPublicPostsOfUser.useQuery({
      userId: profile?.user.id ?? "",
    });

  if (isLoading || postsLoading) return <div>Loading...</div>;
  if (!posts) return <div>No posts found</div>;

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-start gap-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default UserPosts;
