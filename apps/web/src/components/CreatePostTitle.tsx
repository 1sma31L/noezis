"use client";
import { usePost } from "@/lib/hooks/usePost";
import { Textarea } from "@/components/ui/textarea";

export const CreatePostTitle = () => {
  const { post, setPost } = usePost();

  return (
    <div className="flex flex-col gap-2 pt-8">
      <Textarea
        id="title"
        placeholder="Your Title"
        onChange={(e) => {
          setPost({
            ...post,
            title: e.target.value,
          });
        }}
        value={post.title}
        className="placeholder:text-muted-foreground/20 max-w-full resize-none overflow-hidden border-0 !bg-transparent p-0 !text-3xl leading-tight font-bold shadow-none focus:outline-none focus-visible:ring-0 md:!text-5xl"
      />
    </div>
  );
};
