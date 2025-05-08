import { authClient } from "@/lib/auth-client";
import { useCallback } from "react";

interface CreateOrgOptions
  extends Parameters<typeof authClient.organization.create> {}

export function useCreateOrg(options?: CreateOrgOptions) {
  return useCallback(async () => {
    await authClient.organization.create({
      name: "",
      slug: "",
      keepCurrentActiveOrganization: true,
      ...options,
    });
  }, [options]);
}
