import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  haveIBeenPwned,
  multiSession,
  organization,
} from "better-auth/plugins";

export const auth = betterAuth({
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
  emailAndPassword: { enabled: true, autoSignIn: true },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 12 * 60 * 1000, //12 hours expiration
  },
  socialProviders: {
    discord: {
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
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
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 3,
      teams: {
        defaultTeam: {
          enabled: false,
        },
        enabled: true,
        allowRemovingAllTeams: false,
        maximumTeams: 10,
      },
    }),
  ],
});
