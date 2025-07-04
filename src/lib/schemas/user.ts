import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().url("Please enter a valid URL").optional().nullable(),
  bannerImage: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});
