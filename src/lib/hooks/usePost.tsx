import { usePostStore } from "@/lib/store/post";

export const usePost = () => {
  const { post, setPost, isLoading, setIsLoading } = usePostStore();

  return { post, setPost, isLoading, setIsLoading };
};
