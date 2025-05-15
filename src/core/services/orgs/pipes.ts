import {
  maxLength,
  minLength,
  object,
  pipe,
  string,
  uuid,
  type InferInput,
} from "valibot";

export const createOrgRequestSchema = object({
  name: pipe(
    string(),
    minLength(2, "Name is too short"),
    maxLength(50, "Name is too long"),
  ),
  slug: string(),
  userId: pipe(string(), uuid()),
});

export type CreateOrgRequest = InferInput<typeof createOrgRequestSchema>;
