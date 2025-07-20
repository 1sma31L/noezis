import { useQuery } from "@tanstack/react-query";
import { authClient } from "../clients/auth-client";
import type { Session } from "@/server/lib/auth";

export function useSession(initialData?: Session | null) {
  const session = useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw new Error("Failed to get session");
      }
      return data;
    },
    initialData,
  });
  return session;
}
