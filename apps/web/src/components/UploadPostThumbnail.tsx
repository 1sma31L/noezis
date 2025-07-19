/* eslint-disable @next/next/no-img-element */
"use client";
import { usePost } from "@/lib/hooks/usePost";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { uploadImage } from "@/lib/helpers/appwrite";
import { BUCKET_IDS } from "@/lib/clients/appwrite-client";

export const UploadPostThumbnail = () => {
  const { post, setPost } = usePost();

  return (
    <div className="flex flex-col gap-2">
      <Label>Thumbnail</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={async (e) => {
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
      {post.thumbnail && (
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
  );
};
