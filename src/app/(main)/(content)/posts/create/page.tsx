"use client";
import Tiptap from "@/components/content/Editor";
import { Separator } from "@/components/ui/separator";
import { UploadPostThumbnail } from "@/components/content/UploadPostThumbnail";
import { PublishPost } from "@/components/content/PublishPost";
import { CreatePostTitle } from "@/components/content/CreatePostTitle";
import { CreatePostTags } from "@/components/content/CreatePostTags";

function CreatePost() {
  return (
    <div className="container mx-auto flex min-h-screen max-w-4xl flex-col gap-4 px-4 py-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">
        Create a Post
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Share your thoughts, ideas, or stories with the community
      </p>
      <CreatePostTitle />
      <Separator className="my-4" />
      <Tiptap />
      <CreatePostTags />
      <UploadPostThumbnail />
      <PublishPost />
    </div>
  );
}

export default CreatePost;
