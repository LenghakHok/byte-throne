import type { ListTeamsRequest } from "./pipes";

export const queryKeys = {
  all: ["teams"] as const,
  lists: () => [queryKeys.all, "lists"],
  list: (arg: ListTeamsRequest) => [queryKeys.all, "lists", arg],
  details: () => [queryKeys.all, "detail"],
  detail: (arg: unknown) => [queryKeys.all, "detail", arg],
};

export const mutationKeys = {
  create: (arg: unknown) => [...queryKeys.all, "create", arg] as const,
  update: (arg: unknown) => [...queryKeys.all, "update", arg] as const,
  delete: (arg: unknown) => [...queryKeys.all, "delete", arg] as const,
};
