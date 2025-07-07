import { useProfileStore } from "@/lib/store/profile";

export function useProfile() {
  const { profile, setProfile, isAuthenticated, setIsAuthenticated } =
    useProfileStore();

  return {
    profile,
    setProfile,
    isAuthenticated,
    setIsAuthenticated,
    isLoading: false,
  };
}
