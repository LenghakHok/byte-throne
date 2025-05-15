import type { ListTeamsRequest } from "./pipes";

export const queryKeys = {
  all: ["teams"] as const,
  lists: () => [queryKeys.all, "lists"],
  list: (arg: ListTeamsRequest) => [queryKeys.all, "lists", arg],
};

export const mutationKeys = {
  create: () => [...queryKeys.all, "create"] as const,
};
