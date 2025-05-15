import { auth } from "@/core/lib/auth-server";
import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "./keys";

export function loadListTeams(
  queryclient: QueryClient,
  ...args: Parameters<typeof auth.api.listOrganizationTeams>
) {
  const [params] = args;
  return queryclient.prefetchQuery({
    queryKey: queryKeys.list({
      organizationId: params?.query?.organizationId,
    }),
    queryFn: async () => {
      try {
        const data = await auth.api.listOrganizationTeams(...args);
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
