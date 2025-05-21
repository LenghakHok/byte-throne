import { $fetch } from "@/core/lib/http-client";
import { object, optional, string } from "valibot";
import type { TeamIdParamsRequest } from "./pipes";

export async function getDetailTeam(arg: TeamIdParamsRequest) {
  return await $fetch(`/api/teams/${arg.id}`, {
    credentials: "include",
    throw: false,
    output: object({
      id: string(),
      name: string(),
      createdAt: string(),
      organizationId: string(),
      updatedAt: optional(string()),
    }),
    errorSchema: object({
      message: string(),
    }),
  });
}
