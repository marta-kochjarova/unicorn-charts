import { db } from "@/db/db";
import { schema } from "@/db/schema";
import { initTRPC } from "@trpc/server";
import { sql } from "drizzle-orm";

//create a trpc server, initialize router and public procedure
const trpcServer = initTRPC.create();
export const router = trpcServer.router;
export const procedure = trpcServer.procedure;

//create appRouter with all endpoints
export const appRouter = router({

  getChartNames: procedure.query(async () => {
    const result = await db.select().from(schema.chart);
    return result.map((chart) => chart.title);
  }),

  getChartsWithLikes: procedure.query(async () => {
    const chartsWithLikes = await db
      //pulls all charts with their ids and titles and then all likes
      .select({
        id: schema.chart.id,
        title: schema.chart.title,
        likesCount: sql`COUNT(${schema.userChart.chartId})`.as("likesCount"),
      })
      .from(schema.chart)
      //assigns likes to corresponding charts
      .leftJoin(
        schema.userChart,
        sql`${schema.chart.id} = ${schema.userChart.chartId}`
      )
      .groupBy(schema.chart.id);

    return chartsWithLikes;
  }),
});

//create trpc API type
export type AppRouter = typeof appRouter;
