import {
  minLength,
  object,
  optional,
  pipe,
  string,
  type InferInput,
} from "valibot";

export const createTeamRequest = object({
  name: pipe(string(), minLength(2, "Name is too short")),
});
export interface CreateTeamRequest
  extends InferInput<typeof createTeamRequest> {}

export const listTeamsRequest = object({
  organizationId: optional(string()),
});
export interface ListTeamsRequest extends InferInput<typeof listTeamsRequest> {}
