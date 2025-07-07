import { useSession } from "@/lib/clients/auth-client";
import { api } from "@/trpc/react";

const PROFILE_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5,
  keepPreviousData: true,
};

export function useInitProfile() {
  const { data: session } = useSession();

  return api.user.getProfileByUserId.useQuery(
    { userId: session?.user?.id ?? "" },

    {
      enabled: !!session?.user?.id,
      ...PROFILE_QUERY_CONFIG,
    },
  );
}

export function useInitProfileByUsername(username: string) {
  return api.user.getProfileByUsername.useQuery(
    { username },
    {
      ...PROFILE_QUERY_CONFIG,
      enabled: !!username,
    },
  );
}
