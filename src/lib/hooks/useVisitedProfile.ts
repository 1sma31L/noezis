import { useVisitedProfileStore } from "@/lib/store/profile";

export function useVisitedProfile() {
  const {
    visitedProfile,
    setVisitedProfile,
    isOwner,
    setIsOwner,
    isLoading,
    setIsLoading,
  } = useVisitedProfileStore();

  return {
    visitedProfile,
    setVisitedProfile,
    isOwner,
    setIsOwner,
    isLoading,
    setIsLoading,
  };
}
