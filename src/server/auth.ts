import { auth } from "@/lib/auth-server";
import { Hono } from "hono";

const app = new Hono();

app.on(["POST", "GET"], "/**", (c) => auth.handler(c.req.raw));

export { app as auth };
