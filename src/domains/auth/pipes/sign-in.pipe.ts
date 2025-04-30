import { createValidate, type IValidation, type tags } from "typia";

export interface SignInRequest {
  email: string & tags.Format<"email">;
  password: string & tags.MinLength<8> & tags.MaxLength<32>;
  rememberMe: boolean & tags.Default<true>;
}

export const signInRequestErrors = {
  email: {
    'Format<"email">': "The email address is not valid",
  },
  password: {
    "MinLength<8>": "Password too short (min 8 characters)",
    "MaxLength<32>": "Password too long (max 32 characters)",
  },
};

export const validateSignInRequest: (
  input: Partial<SignInRequest>,
) => IValidation<SignInRequest> = createValidate<SignInRequest>();
