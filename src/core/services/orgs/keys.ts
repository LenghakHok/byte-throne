export const queryKeys = {
  all: ["orgs"] as const,
};

export const mutationKeys = {
  create: () => [...queryKeys.all, "create"] as const,
};
