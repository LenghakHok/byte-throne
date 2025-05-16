import { authClient } from "@/core/lib/auth-client";
import { $queryClient } from "@/core/lib/query-client";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutationKeys, queryKeys } from "./keys";
import type { CreateTeamRequest } from "./pipes";

export function useCreateTeam(form?: UseFormReturn) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
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
    },
    queryClient,
  );
}

export function useListTeams(
  ...args: Parameters<typeof authClient.organization.listTeams>
) {
  const queryClient = useStore($queryClient);
  const [params] = args;
  return useQuery(
    {
      queryKey: queryKeys.list({
        organizationId: params?.query?.organizationId,
      }),
      queryFn: async () => {
        return await authClient.organization.listTeams(...args);
      },
    },
    queryClient,
  );
}

export function useSuspenseListTeams(
  ...args: Parameters<typeof authClient.organization.listTeams>
) {
  const queryClient = useStore($queryClient);
  const [params] = args;
  return useSuspenseQuery(
    {
      queryKey: queryKeys.list({
        organizationId: params?.query?.organizationId,
      }),
      queryFn: async () => {
        return await authClient.organization.listTeams(...args);
      },
    },
    queryClient,
  );
}
