import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from './schema'

if (!process.env.DATABASE_URL){
     throw new Error('DATABASE_URL is required');
}

//creates DB adapter
const postgresqlClient = postgres(process.env.DATABASE_URL);

// creates a DB client that uses the DB adapter and schema
export const db = drizzle(postgresqlClient, { schema })