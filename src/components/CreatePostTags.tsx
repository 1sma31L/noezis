"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePost } from "@/lib/hooks/usePost";

export const CreatePostTags = () => {
  const { post, setPost } = usePost();

  return (
    <div className="flex flex-col gap-2">
      <Label>Tags</Label>
      <Input
        type="text"
        placeholder="Tags"
        onChange={(e) => {
          setPost({
            ...post,
            tags: e.target.value.split(",").map((tag) => tag.trim()),
          });
        }}
        value={post.tags.join(",")}
      />
    </div>
  );
};
