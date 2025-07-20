import { api } from "@/trpc/react";
import { useProfileByUsername } from "./useProfile";

export const usePostsByUsername = (username: string) => {
  const { data: profile, isLoading } = useProfileByUsername(username);
  const { data: posts, isLoading: postsLoading } =
    api.post.getPublicPostsOfUser.useQuery({
      userId: profile?.user.id ?? "",
    });

  return { posts, isLoading: postsLoading || isLoading };
};
