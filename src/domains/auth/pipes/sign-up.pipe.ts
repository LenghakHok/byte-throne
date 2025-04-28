import { createValidate, type IValidation, type tags } from "typia";

export interface SignUpRequest {
  givenName: string & tags.MinLength<2> & tags.MaxLength<36>;
  familyName: string & tags.MinLength<2> & tags.MaxLength<36>;
  email: string & tags.Format<"email">;
  password: string & tags.MinLength<8> & tags.MaxLength<32>;
  accept: true;
}

export const signUpRequestErrors = {
  givenName: {
    "MinLength<2>": "Name is Required",
    "MaxLength<36>": "The name is too long (max 36 characters)",
  },
  familyName: {
    "MinLength<2>": "Name is Required",
    "MaxLength<36>": "The name is too long (max 36 characters)",
  },
  email: {
    'Format<"email">': "The email address is not valid",
  },
  password: {
    "MinLength<8>": "Password too short (min 8 characters)",
    "MaxLength<32>": "Password too long (max 32 characters)",
  },
};

export const validateSignUpRequest: (
  input: Partial<SignUpRequest>,
) => IValidation<SignUpRequest> = createValidate<SignUpRequest>();
