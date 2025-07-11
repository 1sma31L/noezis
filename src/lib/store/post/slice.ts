// create user store
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

type Post = {
  title: string;
  content: JSON;
  tags: string[];
  thumbnail: string;
};

interface PostState {
  post: Post | null;
  setPost: (post: Post | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePostStore = create<PostState>()(
  devtools(
    persist(
      (set) => ({
        post: null,
        setPost: (post) => set({ post }),
        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: "post-storage",
      },
    ),
    {
      name: "post-store",
    },
  ),
);
