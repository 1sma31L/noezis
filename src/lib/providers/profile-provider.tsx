import { useInitProfile } from "@/lib/hooks/useInitProfile";
import { useSession } from "../clients/auth-client";
import { useEffect, type ReactNode } from "react";
import { useProfileStore } from "../store/profile";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const { data: profile, isLoading } = useInitProfile();
  const { setProfile, setIsAuthenticated, setIsLoading } = useProfileStore();

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
      setProfile(profile ?? null);
    }
    setIsLoading(isLoading);
  }, [
    profile,
    setProfile,
    session,
    setIsAuthenticated,
    setIsLoading,
    isLoading,
  ]);

  return children;
}
