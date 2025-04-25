import { VITE_APP_URL } from "astro:env/client";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: VITE_APP_URL,
});
