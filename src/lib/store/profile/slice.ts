// create user store
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProfileWithUser } from "@/lib/types/user";

interface ProfileState {
  profile: ProfileWithUser | null;
  setProfile: (profile: ProfileWithUser | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "profile-store",
    },
  ),
);
