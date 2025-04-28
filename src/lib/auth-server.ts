import { db } from "@/db"; // your drizzle instance
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  haveIBeenPwned,
  multiSession,
  organization,
} from "better-auth/plugins";

import * as schema from "@/db/schema";

export const auth = betterAuth({
  basePath: "/",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  trustedOrigins: import.meta.env.WHITELISTED_URLS?.split(","),
  rateLimit: {
    enabled: true,
    storage: "memory",
  },
  socialProviders: {
    discord: {
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
    },
    facebook: {
      clientId: import.meta.env.FACEBOOK_APP_ID,
      clientSecret: import.meta.env.FACEBOOK_APP_SECRET,
    },
    github: {
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    admin(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    multiSession(),
    organization(),
  ],
});
