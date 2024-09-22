import { pgTable, text, serial, uuid, integer } from 'drizzle-orm/pg-core'
import { z } from 'zod';

export const userTable = pgTable('users', {
     id: serial('id').primaryKey(),
     uuid: uuid('uuid').notNull()
});

export const chartTable = pgTable('charts', {
     id: serial('id').primaryKey(),
     title: text('title').notNull()
});

export const userChartTable = pgTable('user_charts', {
     userId: integer('user_id')
          .notNull()
          .references(() => userTable.id, { onDelete: 'cascade' }),
     chartId: integer('chart_id')
          .notNull()
          .references(() => chartTable.id, { onDelete: 'cascade' }),
});

export const schema = {
     user: userTable,
     chart: chartTable,
     userChart: userChartTable,
}

export const uuidSchema = z.string().uuid();