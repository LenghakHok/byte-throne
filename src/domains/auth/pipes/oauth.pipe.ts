import { type } from "arktype";

// Define the Arktype schema for OAuthRequest
export const oAuthRequestType = type({
  provider: type.enumerated("google", "github", "discord"),
});

// Create a type alias from the Arktype definition
export type OAuthRequest = typeof oAuthRequestType.infer;
