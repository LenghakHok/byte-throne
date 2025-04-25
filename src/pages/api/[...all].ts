import { auth } from "@/lib/auth-server";
import type { APIRoute } from "astro";
import { Hono } from "hono";

const app = new Hono().basePath("/api/");

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export const ALL: APIRoute = async (context) =>
  await app.fetch(context.request);
