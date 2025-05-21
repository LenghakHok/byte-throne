import { auth } from "@/core/lib/auth-server";
import { Hono } from "hono";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export { app as auth };
