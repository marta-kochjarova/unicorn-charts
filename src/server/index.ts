import { db } from "@/db/db";
import { schema, uuidSchema } from "@/db/schema";
import { initTRPC } from "@trpc/server";
import { eq, sql } from "drizzle-orm";

//create a trpc server, initialize router and public procedure
const trpcServer = initTRPC.create();
export const router = trpcServer.router;
export const procedure = trpcServer.procedure;

//create appRouter with all endpoints
export const appRouter = router({
  getUserAndChartData: procedure
  .input( uuidSchema )
  .query(async (opts) => {
    const uuid = opts.input;

    let users = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.uuid, uuid))

    if (users.length === 0) {
      users = await db.insert(schema.user).values({uuid: uuid}).returning();
      return users[0];
    }
    
    const charts = await db.select({
      id: schema.chart.id,
      title: schema.chart.title,
      likesCount: sql`COUNT(${schema.userChart.chartId})`.as("likesCount"),
      isLikedByUser: sql<boolean>`EXISTS (
        SELECT 1 FROM ${schema.userChart}
        WHERE ${schema.userChart.chartId} = ${schema.chart.id}
        AND ${schema.userChart.userId} = ${users[0].id}
      )`.as("isLikedByUser")
    })
    .from(schema.chart)
    //assigns likes to corresponding charts
    .leftJoin(
      schema.userChart,
      sql`${schema.chart.id} = ${schema.userChart.chartId}`
    )
    .groupBy(schema.chart.id);
    return {user: users[0], charts: charts};
  }),
});

//create trpc API type
export type AppRouter = typeof appRouter;
