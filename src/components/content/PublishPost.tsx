"use client";
import { Button } from "@/components/ui/button";
import { usePost } from "@/lib/hooks/usePost";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export const PublishPost = () => {
  const { post, resetPost } = usePost();
  const router = useRouter();
  const { mutate: createPost, isPending } = api.post.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully");
      router.push("/home");
      resetPost();
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-muted-foreground self-start text-sm">
        <p>The editor supports markdown!</p>
        <p>
          Your post will be public once reviewed by our team.{" "}
          <Link href="#" className="hover:text-primary hover:underline">
            See why
          </Link>
        </p>
      </div>
      <div className="flex gap-3 self-end">
        <Button variant="outline" onClick={() => resetPost()}>
          Reset
        </Button>
        <Button
          disabled={isPending}
          className={`flex items-center gap-2 ${
            isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={() => {
            createPost(post);
          }}
        >
          {isPending ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </div>
  );
};
