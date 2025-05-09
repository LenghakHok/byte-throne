import type { CreateOrgRequest } from "@/domains/org/pipes/create-org.pipe";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function useCreateOrg<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  return useMutation(
    {
      mutationKey: ["auth", "organization", "create"],
      mutationFn: async (v: CreateOrgRequest) => {
        await authClient.organization.create({
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
        toast.message("An organization is successfully created.");
      },
    },
    queryClient,
  );
}

export function useSetActiveOrg<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(_form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  return useMutation(
    {
      mutationKey: ["auth", "organization", "setActive"],
      mutationFn: async (v: { organizationId: any }) => {
        await authClient.organization.setActive({
          organizationId: v.organizationId,
        });
      },
    },
    queryClient,
  );
}
