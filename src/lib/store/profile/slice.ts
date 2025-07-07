// create user store
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProfileWithUser } from "@/lib/types/user";

interface VisitedProfileState {
  visitedProfile: ProfileWithUser | null;
  setVisitedProfile: (profile: ProfileWithUser | null) => void;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface ProfileState {
  profile: ProfileWithUser | null;
  setProfile: (profile: ProfileWithUser | null) => void;
  removeProfile: () => void;
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
      removeProfile: () => set({ profile: null, isAuthenticated: false }),
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

export const useVisitedProfileStore = create<VisitedProfileState>()(
  devtools(
    (set) => ({
      visitedProfile: null,
      setVisitedProfile: (profile) => set({ visitedProfile: profile }),
      isOwner: false,
      setIsOwner: (isOwner) => set({ isOwner }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "visited-profile-store",
    },
  ),
);
