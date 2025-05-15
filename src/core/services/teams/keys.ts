export const queryKeys = {
  all: ["teams"] as const,
};

export const mutationKeys = {
  create: () => [...queryKeys.all, "create"] as const,
};
