import { object, picklist, type InferInput } from "valibot";

// Define the Arktype schema for OAuthRequest
export const oAuthRequestSchema = object({
  provider: picklist(["google", "github", "discord"]),
});

// Create a type alias from the Arktype definition
export type OAuthRequest = InferInput<typeof oAuthRequestSchema>;
