import type { authClient } from "@/core/lib/auth-client";
import { $queryClient } from "@/core/lib/query-client";
import { useStore } from "@nanostores/react";
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { createTeamOption, listTeamsOption } from "./options";

export function useCreateTeam(form?: UseFormReturn) {
  const queryClient = useStore($queryClient);
  return useMutation(createTeamOption(form), queryClient);
}

export function useListTeams(
  options?: UseQueryOptions,
  ...args: Parameters<typeof authClient.organization.listTeams>
) {
  const queryClient = useStore($queryClient);
  return useQuery(listTeamsOption(options, ...args), queryClient);
}

export function useSuspenseListTeams(
  options?: UseQueryOptions,
  ...args: Parameters<typeof authClient.organization.listTeams>
) {
  const queryClient = useStore($queryClient);
  return useQuery(listTeamsOption(options, ...args), queryClient);
}
