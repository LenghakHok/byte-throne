import { authClient } from "@/core/lib/auth-client";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutationKeys, queryKeys } from "./keys";
import type { CreateTeamRequest } from "./pipes";

export function createTeamOption(form?: UseFormReturn) {
  return {
    mutationKey: mutationKeys.create(),
    mutationFn: async (v: CreateTeamRequest) => {
      return await authClient.organization.createTeam({
        name: v.name,
        fetchOptions: {
          throw: true,
          onError: (e) => {
            form?.setError("root", {
              message: e.error.message,
            });
          },
        },
      });
    },
    onSuccess: (data: typeof authClient.$Infer.Team) => {
      toast.success(`${data.name} team is successfully created.`);
    },
  };
}

export function listTeamsOption(
  options?: Partial<UseQueryOptions>,
  ...args: Parameters<typeof authClient.organization.listTeams>
) {
  const [params] = args;
  return {
    queryKey: queryKeys.list({
      organizationId: params?.query?.organizationId,
    }),
    queryFn: async () => {
      return await authClient.organization.listTeams(...args);
    },
    ...options,
  };
}
