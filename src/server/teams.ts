import { validateTeamIdParams } from "@/core/services/teams/pipes";
import { db } from "@/db";
import { teams } from "@/db/schema";
import { typiaValidator } from "@hono/typia-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono();

app.get(
  "/:id",
  typiaValidator("param", validateTeamIdParams, (result, c) => {
    if (!result.success) {
      return c.json({
        message: "Bad Request",
      });
    }
  }),
  async (c) => {
    const param = c.req.valid("param");

    const team = (
      await db.selectDistinct().from(teams).where(eq(teams.id, param.id))
    ).at(0);

    return c.json(team);
  },
);

export { app as teams };
