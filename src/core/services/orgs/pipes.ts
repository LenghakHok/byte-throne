import type { authClient } from "@/core/lib/auth-client";
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

export interface GetFullOrganizationResponse {
  name: string;
  slug: string;
  logo?: string | null | undefined;
  createdAt: Date;
  metadata?: any;
  id: string;
  invitations: (typeof authClient.$Infer.Invitation)[];
  members: (typeof authClient.$Infer.Member)[];
  teams: (typeof authClient.$Infer.Team)[];
}
