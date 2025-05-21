import { auth } from "@/core/lib/auth-server";
import { db } from "@/db";
import { teams } from "@/db/schema";
import { typiaValidator } from "@hono/typia-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { createValidateEquals } from "typia";

const app = new Hono();

const teamIdValidate = createValidateEquals<string>();

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get(
  "/api/auth/organizations/teams/:id",
  typiaValidator("param", teamIdValidate, (result, c) => {
    if (!result.success) {
      return c.json({
        message: "Bad Request",
      });
    }
  }),
  async (c) => {
    const id = c.req.valid("param");

    const team = (
      await db.selectDistinct().from(teams).where(eq(teams.id, id))
    ).at(0);

    return c.json({ data: team });
  },
);

export { app as auth };
