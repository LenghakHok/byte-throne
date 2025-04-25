import { createAssert, type tags } from "typia";

export interface IEnvClient {
  VITE_APP_NAME: string;
  VITE_APP_URL: string & tags.Format<"uri">;

  BETTER_AUTH_SECRET: undefined;
  BETTER_AUTH_URL: undefined;

  WHITELISTED_URLS: undefined;

  DATABASE_URL: undefined;
  VALKEY_URL: undefined;

  GITHUB_CLIENT_ID: undefined;
  GITHUB_CLIENT_SECRET: undefined;

  GOOGLE_CLIENT_ID: undefined;
  GOOGLE_CLIENT_SECRET: undefined;

  FACEBOOK_APP_ID: undefined;
  FACEBOOK_APP_SECRET: undefined;

  DISCORD_CLIENT_ID: undefined;
  DISCORD_CLIENT_SECRET: undefined;

  RESEND_API_KEY: undefined;
}

export interface IEnvSever {
  VITE_APP_NAME: string;
  VITE_APP_URL: string & tags.Format<"uri">;

  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string & tags.Format<"uri">;

  WHITELISTED_URLS: (string & tags.Format<"uri">)[];

  DATABASE_URL: string & tags.Format<"uri">;
  VALKEY_URL: string & tags.Format<"uri">;

  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  FACEBOOK_APP_ID: string;
  FACEBOOK_APP_SECRET: string;

  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;

  RESEND_API_KEY: string;
}

export const assertEnv = createAssert<IEnvSever | IEnvClient>();

export const env = assertEnv({
  ...import.meta.env,
  WHITELISTED_URLS: import.meta.env.WHITELISTED_URLS?.split(","),
});
