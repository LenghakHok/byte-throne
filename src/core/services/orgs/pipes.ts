import {
  maxLength,
  minLength,
  object,
  optional,
  pipe,
  string,
  uuid,
  type InferInput,
} from "valibot";

export const createOrgRequest = object({
  name: pipe(
    string(),
    minLength(2, "Name is too short"),
    maxLength(50, "Name is too long"),
  ),
  slug: string(),
  userId: pipe(string(), uuid()),
});

export type CreateOrgRequest = InferInput<typeof createOrgRequest>;

export const getFullOrganizationRequest = object({
  organizationId: optional(string()),
  organizationSlug: optional(string()),
});
export interface GetFullOrganizationRequest
  extends InferInput<typeof getFullOrganizationRequest> {}
