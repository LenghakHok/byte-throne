import { createFetch } from "@better-fetch/fetch";
import { PUBLIC_APP_URL } from "astro:env/client";

export const $fetch = createFetch({
  baseURL: PUBLIC_APP_URL,
  throw: true,
  credentials: "same-origin",
});
