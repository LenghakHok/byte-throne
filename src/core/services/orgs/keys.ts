import type { GetFullOrganizationRequest } from "./pipes";

export const queryKeys = {
  all: ["orgs"] as const,
  fullOrganization: (args?: GetFullOrganizationRequest) => [
    ...queryKeys.all,
    "full",
    args,
  ],
};

export const mutationKeys = {
  create: () => [...queryKeys.all, "create"] as const,
};
