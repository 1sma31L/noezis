import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().url("Please enter a valid URL").optional().nullable(),
  bannerImage: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});
