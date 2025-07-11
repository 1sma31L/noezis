/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Tiptap from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/lib/hooks/usePost";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/lib/helpers/appwrite";
import { BUCKET_IDS } from "@/lib/clients/appwrite-client";

function CreatePost() {
  const router = useRouter();
  const { setPost, post } = usePost();
  const { mutate: createPost, isPending } = api.post.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully");
      router.push("/home");
      setPost(null);
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });
  useEffect(() => {
    if (!post) {
      setPost({
        title: "",
        content: JSON.parse("{}") as JSON,
        tags: [],
        thumbnail: "",
      });
    }
  }, [post, setPost]);
  return (
    <div className="container mx-auto flex min-h-screen max-w-4xl flex-col gap-4 px-4 py-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">
        Create a Post
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Share your thoughts, ideas, or stories with the community
      </p>

      {/* Post Title */}
      <div className="flex flex-col gap-2 pt-8">
        <Textarea
          id="title"
          placeholder="Your Title"
          onChange={(e) => {
            if (!post) return;
            setPost({
              ...post,
              title: e.target.value,
            });
          }}
          value={post?.title ?? ""}
          className="placeholder:text-muted-foreground/20 max-w-full resize-none overflow-hidden border-0 !bg-transparent p-0 !text-3xl leading-tight font-bold shadow-none focus:outline-none focus-visible:ring-0 md:!text-5xl"
        />
      </div>
      <Separator className="my-4" />
      <Tiptap />
      {/* Tags */}
      <div className="flex flex-col gap-2">
        <Label>Tags</Label>
        <Input
          type="text"
          placeholder="Tags"
          onChange={(e) => {
            if (!post) return;
            setPost({
              ...post,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            });
          }}
          value={post?.tags.join(",") ?? ""}
        />
      </div>
      {/* Add thumbnail upload */}
      <div className="flex flex-col gap-2">
        <Label>Thumbnail</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (!post) return;
            const file = e.target.files?.[0];
            if (file) {
              const toastId = toast.loading("Uploading thumbnail...");
              try {
                const fileUrl = await uploadImage(
                  file,
                  BUCKET_IDS.POST_THUMBNAILS,
                );
                setPost({
                  ...post,
                  thumbnail: fileUrl,
                });
                toast.dismiss(toastId);
                toast.success("Thumbnail uploaded successfully");
              } catch (error) {
                console.error("Error uploading thumbnail:", error);
                toast.dismiss(toastId);
                toast.error("Failed to upload thumbnail");
              }
            }
          }}
        />
        {post?.thumbnail && (
          <div className="mt-2">
            <p className="text-muted-foreground mb-2 text-sm">
              Current thumbnail:
            </p>
            <div className="flex items-center gap-4">
              <img
                src={post.thumbnail}
                alt="Post thumbnail"
                className="max-w-[200px] rounded-md border"
              />
              <button
                type="button"
                className="bg-destructive hover:bg-destructive/80 ml-2 rounded px-3 py-1 text-xs font-medium text-white"
                onClick={() => {
                  setPost({
                    ...post,
                    thumbnail: "",
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
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
          <Button variant="outline" onClick={() => setPost(null)}>
            Reset
          </Button>
          <Button
            disabled={isPending}
            className={`flex items-center gap-2 ${
              isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!post) return;
              createPost(post);
            }}
          >
            {isPending ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
