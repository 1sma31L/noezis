import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Post = {
  title: string;
  content: JSON;
  tags: string[];
  thumbnail: string;
};

const initialPost: Post = {
  title: "",
  content: JSON.parse("{}") as JSON,
  tags: [],
  thumbnail: "",
};

interface PostState {
  post: Post;
  setPost: (post: Post) => void;
  resetPost: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePostStore = create<PostState>()(
  /* TODO: fix the anonymous name */
  devtools(
    persist(
      (set) => ({
        post: initialPost,
        setPost: (post) => set({ post }),
        resetPost: () => set({ post: initialPost }),
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
