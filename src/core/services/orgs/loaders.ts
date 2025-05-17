import { auth } from "@/core/lib/auth-server";
import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "./keys";

export function preloadFullOrganization(
  queryclient: QueryClient,
  ...args: Parameters<typeof auth.api.getFullOrganization>
) {
  const [params] = args;

  return queryclient.prefetchQuery({
    queryKey: queryKeys.fullOrganization({
      organizationId: params?.query?.organizationId,
    }),
    queryFn: async () => {
      try {
        const data = await auth.api.getFullOrganization(...args);
        return {
          data: data,
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error,
        };
      }
    },
  });
}
