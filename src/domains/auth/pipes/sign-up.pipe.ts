import {
  boolean,
  email,
  literal,
  maxLength,
  minLength,
  object,
  pipe,
  string,
  type InferInput,
} from "valibot";

export const signUpRequestSchema = object({
  givenName: pipe(
    string(),
    minLength(2, "Name is too short"),
    maxLength(50, "Name is too long"),
  ),
  familyName: pipe(
    string(),
    minLength(2, "Name is too short"),
    maxLength(50, "Name is too long"),
  ),
  email: pipe(string(), email("The input is not a valid email address")),
  password: string(),
  accept: pipe(boolean(), literal(true)),
});

export type SignUpRequest = InferInput<typeof signUpRequestSchema>;
