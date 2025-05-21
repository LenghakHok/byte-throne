import { createValidateEquals } from "typia";
import {
  minLength,
  object,
  optional,
  pipe,
  string,
  type InferInput,
} from "valibot";

export const createTeamRequest = object({
  name: pipe(string(), minLength(2, "Team name is too short")),
});
export interface CreateTeamRequest
  extends InferInput<typeof createTeamRequest> {}

export const updateTeamRequest = object({
  teamId: string(),
  data: object({
    name: pipe(
      string("Name is required"),
      minLength(2, "Team name is too short"),
    ),
  }),
});
export interface UpdateTeamRequest
  extends InferInput<typeof updateTeamRequest> {}

export const removeTeamRequest = object({
  teamId: string(),
  organizationId: optional(string()),
});
export interface RemoveTeamRequest
  extends InferInput<typeof removeTeamRequest> {}

export const listTeamsRequest = object({
  organizationId: optional(string()),
});
export interface ListTeamsRequest extends InferInput<typeof listTeamsRequest> {}

export interface TeamIdParamsRequest {
  id: string;
}
export const validateTeamIdParams = createValidateEquals<TeamIdParamsRequest>();
