import { api } from "@/trpc/react";
import { useSession } from "./useSession";

const PROFILE_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5,
  keepPreviousData: true,
};

export function useProfile() {
  const { data: session } = useSession();

  const profile = api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },
    {
      enabled: !!session?.user?.id,
      ...PROFILE_QUERY_CONFIG,
    },
  );
  return {
    session,
    ...profile,
  };
}

export function useProfileByUsername(username: string) {
  const profile = api.user.getProfileByUsername.useQuery(
    { username },
    {
      ...PROFILE_QUERY_CONFIG,
      enabled: !!username,
      suspense: true,
    },
  );
  const { data: session } = useSession();
  const isOwner = profile.data?.user.id === session?.user?.id;
  return { ...profile, isOwner };
}
