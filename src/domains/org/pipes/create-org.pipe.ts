import { createValidate, type IValidation, type tags } from "typia";

export interface CreateOrgRequest {
  name: string & tags.MinLength<2> & tags.MaxLength<255>;
  slug: string & tags.MinLength<2> & tags.MaxLength<255>;
  userId: string;
}

export const createOrgErrorMessage = {
  name: {
    "MinLength<2>": "The name must be at least 2 characters",
    "MinLength<3>": "The name must be at most 255 characters",
  },
  slug: {
    "MinLength<2>": "The slug must be at least 2 characters",
    "MinLength<3>": "The slug must be at most 255 characters",
  },
};

export const validateCreateOrg: (
  input: Partial<CreateOrgRequest>,
) => IValidation<CreateOrgRequest> = createValidate<CreateOrgRequest>();
