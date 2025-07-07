import { useProfileStore } from "@/lib/store/profile";

export function useProfile() {
  const {
    profile,
    setProfile,
    isAuthenticated,
    setIsAuthenticated,
    removeProfile,
  } = useProfileStore();

  return {
    profile,
    setProfile,
    isAuthenticated,
    setIsAuthenticated,
    isLoading: false,
    removeProfile,
  };
}
