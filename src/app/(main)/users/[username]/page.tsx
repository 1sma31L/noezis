"use client";
import Post from "@/components/content/Post";
import { usePostsByUsername } from "@/lib/hooks/usePostsByUsername";
import { useParams } from "next/navigation";

function ProfilePosts() {
  const { username } = useParams();
  const { posts, isLoading } = usePostsByUsername(username as string);
  if (isLoading) return <div>Loading...</div>;
  if (!posts) return <div>No posts found</div>;

  return (
    <div className="flex min-h-screen flex-col items-start justify-start gap-2 md:gap-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
