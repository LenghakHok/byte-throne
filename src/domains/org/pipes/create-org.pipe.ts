import { createValidate, type IValidation, type tags } from "typia";

export interface CreateOrgRequest {
  name: string & tags.MinLength<2> & tags.MaxLength<255>;
  slug: string & tags.MinLength<2> & tags.MaxLength<255>;
  invitations: (string & tags.Format<"email">)[];
}

export const CreateOrgErrorMessage = {
  name: {
    "MinLength<2>": "The company name must be at least 2 characters",
    "MinLength<3>": "The company name must be at most 255 characters",
  },
  slug: {
    "MinLength<2>": "The company name must be at least 2 characters",
    "MinLength<3>": "The company name must be at most 255 characters",
  },
  invitations: {
    'Format<"email">': "",
  },
};

export const validateCreateOrg: (
  input: Partial<CreateOrgRequest>,
) => IValidation<CreateOrgRequest> = createValidate<CreateOrgRequest>();
