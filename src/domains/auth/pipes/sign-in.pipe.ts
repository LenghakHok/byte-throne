import {
  boolean,
  email,
  minLength,
  object,
  pipe,
  string,
  type InferInput,
} from "valibot";

// SignInRequest schema with error messages
export const signInRequestSchema = object({
  email: pipe(
    string(),
    email("The input is not valid email address"),
    minLength(1, "Email is required"),
  ),
  password: pipe(
    string(),
    minLength(8, "Password has to be at least 8 characters"),
  ),
  rememberMe: boolean(),
});

export type SignInRequest = InferInput<typeof signInRequestSchema>;
