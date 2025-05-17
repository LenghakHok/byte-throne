import { authClient } from "@/core/lib/auth-client";
import { $queryClient } from "@/core/lib/query-client";
import { queryKeys as orgsQueryKeys } from "@/core/services/orgs/keys";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutationKeys, queryKeys as teamQueryKeys } from "./keys";
import type { CreateTeamRequest, RemoveTeamRequest } from "./pipes";

export function useCreateTeam<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: mutationKeys.create(form?.getValues()),
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
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: teamQueryKeys.all,
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: orgsQueryKeys.all,
          exact: false,
        });
      },
    },
    queryClient,
  );
}

export function useDeleteTeam<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: mutationKeys.delete(form?.getValues),
      mutationFn: async (v: RemoveTeamRequest) => {
        return await authClient.organization.removeTeam({
          teamId: v.teamId,
          organizationId: v.organizationId,
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
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: teamQueryKeys.all,
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: orgsQueryKeys.all,
          exact: false,
        });
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
      queryKey: teamQueryKeys.list({
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
      queryKey: teamQueryKeys.list({
        organizationId: params?.query?.organizationId,
      }),
      queryFn: async () => {
        return await authClient.organization.listTeams(...args);
      },
    },
    queryClient,
  );
}
