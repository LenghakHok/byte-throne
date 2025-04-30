import { auth } from "@/server/auth";
import type { APIRoute } from "astro";
import { WHITELISTED_URLS } from "astro:env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { trimTrailingSlash } from "hono/trailing-slash";

const app = new Hono();

app.use(cors({ origin: WHITELISTED_URLS }));
app.use(csrf({ origin: WHITELISTED_URLS }));
app.use(requestId());
app.use(secureHeaders());
app.use(trimTrailingSlash());

app.route("/", auth);

export const ALL: APIRoute = async (context) =>
  await app.fetch(context.request);
