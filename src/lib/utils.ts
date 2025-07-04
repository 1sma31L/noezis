import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { storage, type BUCKET_IDS } from "./appwrite";
import { ID } from "appwrite";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadImage(
  file: File,
  bucketId: (typeof BUCKET_IDS)[keyof typeof BUCKET_IDS],
) {
  try {
    // Create a unique file ID
    const fileId = ID.unique();

    // Upload the file to Appwrite storage
    const result = await storage.createFile(bucketId, fileId, file);

    // Get the file view URL
    const fileUrl = storage.getFileView(bucketId, result.$id);

    return fileUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteImage(
  fileId: string,
  bucketId: (typeof BUCKET_IDS)[keyof typeof BUCKET_IDS],
) {
  try {
    await storage.deleteFile(bucketId, fileId);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
