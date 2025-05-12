import { auth as betterAuth } from "@/core/lib/auth-server";
import { defineMiddleware, sequence } from "astro:middleware";

const forbidden = ["/dashboard", "/teams"];

const auth = defineMiddleware(async (context, next) => {
  const session = await betterAuth.api.getSession({
    headers: context.request.headers,
  });

  if (
    forbidden.some((v) => context.originPathname.startsWith(v)) &&
    session === null
  ) {
    return context.redirect("/auth/sign-in");
  }

  // session will already asserted to not null since we have checked
  context.locals.session = session;

  return next();
});

export const onRequest = sequence(auth);
