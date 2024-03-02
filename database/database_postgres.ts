import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'
import { ELECTRIC_MIGRATION_PROXY } from './util'

// export const connection = await postgres(PROXY_DATABASE_URL)
// export const postgresClient = postgres(DATABASE_URL, {

export const postgresClient = postgres(
	// To electrify tables (ex: `ALTER TABLE table_name ENABLE ELECTRIC`), Drizzle needs to talk to Electric Proxy database, not directly to the source database.
	// PROXY_DATABASE_URL,
	ELECTRIC_MIGRATION_PROXY,
	{
		max: 1, // Recommended for DDL migrations, docs https://orm.drizzle.team/docs/get-started-postgresql.
	},
)

export const db = drizzle(postgresClient, { schema })
