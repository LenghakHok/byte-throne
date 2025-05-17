import { authClient } from "@/core/lib/auth-client";
import { $queryClient } from "@/core/lib/query-client";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutationKeys, queryKeys } from "./keys";
import type { CreateOrgRequest } from "./pipes";

export function useCreateOrg<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: mutationKeys.create(),
      mutationFn: async (v: CreateOrgRequest) => {
        return await authClient.organization.create({
          name: v.name,
          slug: v.slug,
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
      onSuccess: () => {
        toast.success("An organization is successfully created.");
      },
    },
    queryClient,
  );
}

export function useSetActiveOrg() {
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: ["auth", "organization", "setActive"],
      mutationFn: async (
        v: Parameters<typeof authClient.organization.setActive>[0],
      ) => {
        return await authClient.organization.setActive({
          organizationId: v?.organizationId,
        });
      },
    },
    queryClient,
  );
}

export function useGetFullOrganization(
  ...args: Parameters<typeof authClient.organization.getFullOrganization>
) {
  const queryClient = useStore($queryClient);
  return useQuery(
    {
      queryKey: queryKeys.fullOrganization({
        ...args?.[0]?.query,
      }),
      queryFn: async () => {
        return await authClient.organization.getFullOrganization(...args);
      },
    },
    queryClient,
  );
}
