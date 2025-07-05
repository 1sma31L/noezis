import { storage, type BUCKET_IDS } from "@/lib/clients/appwrite-client";
import { ID } from "appwrite";

export async function uploadImage(
  file: File,
  bucketId: (typeof BUCKET_IDS)[keyof typeof BUCKET_IDS],
) {
  try {
    const fileId = ID.unique();
    const result = await storage.createFile(bucketId, fileId, file);
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
