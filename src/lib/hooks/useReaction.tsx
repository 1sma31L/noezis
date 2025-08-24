import { useSession } from "@/lib/hooks/useSession";
import { api } from "@/trpc/react";
import {
  useReactionStore,
  type ContentType,
  type ReactionType,
} from "@/lib/store/reaction";
import { useEffect } from "react";

function useReaction(contentId: string, contentType: ContentType) {
  const { data: session } = useSession();
  const {
    initializeReaction,
    optimisticToggleReaction,
    updateFromServer,
    getReactionState,
  } = useReactionStore();

  const { data: reactionStatus, isLoading: isLoadingStatus } =
    api.reaction.getReactionStatus.useQuery(
      {
        contentId: contentId,
        contentType: contentType,
      },
      {
        enabled: !!contentId && !!session?.user?.id,
      },
    );

  const { data: reactionCounts, isLoading: isLoadingCounts } =
    api.reaction.getReactionCounts.useQuery({
      contentId: contentId,
      contentType: contentType,
    });

  const { mutate: toggleReaction } = api.reaction.toggleReaction.useMutation({
    onSuccess: (data, variables) => {
      // Update store with server response after successful mutation
      // We need to refetch to get the latest counts
      void api.useUtils().reaction.getReactionStatus.invalidate({
        contentId: variables.contentId,
        contentType: variables.contentType,
      });
      void api.useUtils().reaction.getReactionCounts.invalidate({
        contentId: variables.contentId,
        contentType: variables.contentType,
      });
    },
    onError: (error, variables) => {
      // Revert optimistic update on error
      const currentState = getReactionState(
        variables.contentId,
        variables.contentType,
      );
      if (currentState) {
        // We need to revert to the previous state
        // This is a bit tricky since we don't store the previous state
        // Let's just refresh the data from server
        void api.useUtils().reaction.getReactionStatus.invalidate({
          contentId: variables.contentId,
          contentType: variables.contentType,
        });
        void api.useUtils().reaction.getReactionCounts.invalidate({
          contentId: variables.contentId,
          contentType: variables.contentType,
        });
      }
    },
  });

  // Initialize store when data is loaded
  useEffect(() => {
    if (
      reactionStatus &&
      reactionCounts &&
      !isLoadingStatus &&
      !isLoadingCounts
    ) {
      initializeReaction(
        contentId,
        contentType,
        reactionStatus.reactionType,
        reactionCounts.likes,
        reactionCounts.dislikes,
      );
    }
  }, [
    reactionStatus,
    reactionCounts,
    isLoadingStatus,
    isLoadingCounts,
    contentId,
    contentType,
    initializeReaction,
  ]);

  // Update store when server data changes
  useEffect(() => {
    if (reactionStatus && reactionCounts) {
      updateFromServer(
        contentId,
        contentType,
        reactionStatus.reactionType,
        reactionCounts.likes,
        reactionCounts.dislikes,
      );
    }
  }, [
    reactionStatus,
    reactionCounts,
    contentId,
    contentType,
    updateFromServer,
  ]);

  const currentState = getReactionState(contentId, contentType);

  const handleToggleReaction = (reactionType: ReactionType) => {
    if (!session?.user?.id) return;

    // Apply optimistic update
    optimisticToggleReaction(contentId, contentType, reactionType);

    // Make API call
    toggleReaction({
      contentId,
      contentType,
      type: reactionType,
    });
  };

  // Use store state if available, otherwise fall back to query data
  const isUpvoted = currentState
    ? currentState.userReaction === "like"
    : reactionStatus?.reactionType === "like";
  const isDownvoted = currentState
    ? currentState.userReaction === "dislike"
    : reactionStatus?.reactionType === "dislike";

  const finalReactionCounts = currentState
    ? {
        likes: currentState.likes,
        dislikes: currentState.dislikes,
      }
    : reactionCounts;

  return {
    isUpvoted,
    isDownvoted,
    toggleReaction: handleToggleReaction,
    reactionCounts: finalReactionCounts,
    isLoading: isLoadingStatus || isLoadingCounts,
  };
}

export default useReaction;
