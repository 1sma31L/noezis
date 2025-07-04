import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);

export const BUCKET_IDS = {
  PROFILE_PICTURES: "6862f6fe003b753eaeef",
  BANNER_PICTURES: "6867fba4002bfce25363",
} as const;
