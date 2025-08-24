import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ContentType = "post" | "quickTake" | "answer" | "question";
export type ReactionType = "like" | "dislike";

interface ReactionState {
  contentId: string;
  contentType: ContentType;
  userReaction: ReactionType | null;
  likes: number;
  dislikes: number;
}

interface ReactionStore {
  // Store reactions by contentId-contentType key
  reactions: Record<string, ReactionState>;

  // Initialize reaction state for content
  initializeReaction: (
    contentId: string,
    contentType: ContentType,
    userReaction: ReactionType | null,
    likes: number,
    dislikes: number,
  ) => void;

  // Optimistically toggle reaction
  optimisticToggleReaction: (
    contentId: string,
    contentType: ContentType,
    newReactionType: ReactionType,
  ) => void;

  // Revert optimistic update on error
  revertOptimisticUpdate: (
    contentId: string,
    contentType: ContentType,
    previousState: ReactionState,
  ) => void;

  // Update with server response
  updateFromServer: (
    contentId: string,
    contentType: ContentType,
    userReaction: ReactionType | null,
    likes: number,
    dislikes: number,
  ) => void;

  // Get reaction state for content
  getReactionState: (
    contentId: string,
    contentType: ContentType,
  ) => ReactionState | null;
}

const createContentKey = (contentId: string, contentType: ContentType) =>
  `${contentId}-${contentType}`;

export const useReactionStore = create<ReactionStore>()(
  devtools(
    (set, get) => ({
      reactions: {},

      initializeReaction: (
        contentId,
        contentType,
        userReaction,
        likes,
        dislikes,
      ) => {
        const key = createContentKey(contentId, contentType);
        set((state) => ({
          reactions: {
            ...state.reactions,
            [key]: {
              contentId,
              contentType,
              userReaction,
              likes,
              dislikes,
            },
          },
        }));
      },

      optimisticToggleReaction: (contentId, contentType, newReactionType) => {
        const key = createContentKey(contentId, contentType);

        set((state) => {
          const currentState = state.reactions[key];
          if (!currentState) return state;

          let newUserReaction: ReactionType | null = null;
          let newLikes = currentState.likes;
          let newDislikes = currentState.dislikes;

          // Handle the toggle logic optimistically
          if (currentState.userReaction === newReactionType) {
            // Same reaction - remove it
            newUserReaction = null;
            if (newReactionType === "like") {
              newLikes = Math.max(0, newLikes - 1);
            } else {
              newDislikes = Math.max(0, newDislikes - 1);
            }
          } else if (currentState.userReaction === null) {
            // No previous reaction - add new one
            newUserReaction = newReactionType;
            if (newReactionType === "like") {
              newLikes = newLikes + 1;
            } else {
              newDislikes = newDislikes + 1;
            }
          } else {
            // Different reaction - change from one to another
            newUserReaction = newReactionType;
            if (
              currentState.userReaction === "like" &&
              newReactionType === "dislike"
            ) {
              newLikes = Math.max(0, newLikes - 1);
              newDislikes = newDislikes + 1;
            } else if (
              currentState.userReaction === "dislike" &&
              newReactionType === "like"
            ) {
              newDislikes = Math.max(0, newDislikes - 1);
              newLikes = newLikes + 1;
            }
          }

          return {
            reactions: {
              ...state.reactions,
              [key]: {
                ...currentState,
                userReaction: newUserReaction,
                likes: newLikes,
                dislikes: newDislikes,
              },
            },
          };
        });
      },

      revertOptimisticUpdate: (contentId, contentType, previousState) => {
        const key = createContentKey(contentId, contentType);
        set((state) => ({
          reactions: {
            ...state.reactions,
            [key]: previousState,
          },
        }));
      },

      updateFromServer: (
        contentId,
        contentType,
        userReaction,
        likes,
        dislikes,
      ) => {
        const key = createContentKey(contentId, contentType);
        set((state) => ({
          reactions: {
            ...state.reactions,
            [key]: {
              contentId,
              contentType,
              userReaction,
              likes,
              dislikes,
            },
          },
        }));
      },

      getReactionState: (contentId, contentType) => {
        const key = createContentKey(contentId, contentType);
        return get().reactions[key] ?? null;
      },
    }),
    {
      name: "reaction-store",
    },
  ),
);
