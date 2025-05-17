import type { ListTeamsRequest } from "./pipes";

export const queryKeys = {
  all: ["teams"] as const,
  lists: () => [queryKeys.all, "lists"],
  list: (arg: ListTeamsRequest) => [queryKeys.all, "lists", arg],
};

export const mutationKeys = {
  create: (arg: unknown) => [...queryKeys.all, "create", arg] as const,
  delete: (arg: unknown) => [...queryKeys.all, "create", arg] as const,
};
