import { auth } from "@/lib/auth-server";
import { defineMiddleware, sequence } from "astro:middleware";

const forbidden = ["/dashboard", "/teams"];

const authMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  // context.locals.session = session;

  if (
    forbidden.some((v) => context.originPathname.startsWith(v)) &&
    !session?.session.id
  ) {
    return context.redirect("/auth/sign-in");
  }

  return response;
});

export const onRequest = sequence(authMiddleware);
