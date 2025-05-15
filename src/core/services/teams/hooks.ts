import { authClient } from "@/core/lib/auth-client";
import { queryClient } from "@/core/lib/query-client";
import type { CreateTeamRequest } from "@/domains/teams/pipes/create-team-pipe";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutationKeys } from "./keys";

export function useCreateTeam(form?: UseFormReturn) {
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
      onSuccess: (data) => {
        toast.success(`${data.name} team is successfully created.`);
      },
    },
    queryClient,
  );
}
