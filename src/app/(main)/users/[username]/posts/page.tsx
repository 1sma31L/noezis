"use client";
import React, { use } from "react";
import Post from "@/components/content/Post";
import { usePostsByUsername } from "@/lib/hooks/usePostsByUsername";

function UserPosts({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { posts, isLoading: postsLoading } = usePostsByUsername(username);

  if (postsLoading) return <div>Loading...</div>;
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
