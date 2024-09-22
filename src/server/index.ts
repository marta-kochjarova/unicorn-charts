import { db } from "@/db/db";
import { schema, uuidSchema } from "@/db/schema";
import { initTRPC } from "@trpc/server";
import { eq, sql, and } from "drizzle-orm";
import { z } from "zod";

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


  toggleLike: procedure
  .input(z.object({
    userId: z.number(),
    chartId: z.number()
  }))
  .mutation(
    async (opts) => {
      const { userId, chartId } = opts.input; // Destructure input

      const existingRecord = await db
      .select()
      .from(schema.userChart)
      .where(
        and(
          (sql`${schema.userChart.userId} = ${userId}`), (sql`${schema.userChart.chartId} = ${chartId}`)
        )
      ).limit(1);

      if (existingRecord.length > 0) {
        // Record exists, so delete it
        await db
          .delete(schema.userChart)
          .where(
            and(
              (sql`${schema.userChart.userId} = ${userId}`),(sql`${schema.userChart.chartId} = ${chartId}`)
            )
            
          );
        return { message: 'Like removed' };
      } else {
        // Record does not exist, so create it
        await db.insert(schema.userChart).values({ userId, chartId }).returning();
        return { message: 'Like added' };
      }


      //await db.insert(schema.userChart).values({userId : userId, chartId : chartId}).returning();
    }
  )
  
});

//create trpc API type
export type AppRouter = typeof appRouter;
