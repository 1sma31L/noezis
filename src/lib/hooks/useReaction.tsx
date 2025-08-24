import { useSession } from "@/lib/hooks/useSession";
import { api } from "@/trpc/react";

function useReaction(contentId: string, contentType: string) {
  const { data: session } = useSession();

  const { data: reactionStatus, refetch: refetchReactionStatus } =
    api.reaction.getReactionStatus.useQuery(
      {
        contentId: contentId,
        contentType: contentType as
          | "post"
          | "quickTake"
          | "answer"
          | "question",
      },
      {
        enabled: !!contentId || !!session?.user?.id,
      },
    );

  const { data: reactionCounts, refetch: refetchReactionCounts } =
    api.reaction.getReactionCounts.useQuery({
      contentId: contentId,
      contentType: contentType as "post" | "quickTake" | "answer" | "question",
    });

  const { mutate: toggleReaction } = api.reaction.toggleReaction.useMutation({
    onSuccess: () => {
      refetchReactionStatus();
      refetchReactionCounts();
    },
  });

  const isUpvoted = reactionStatus?.reactionType === "like";
  const isDownvoted = reactionStatus?.reactionType === "dislike";

  return {
    isUpvoted,
    isDownvoted,
    toggleReaction,
    reactionCounts,
  };
}

export default useReaction;
