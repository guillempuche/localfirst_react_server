import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import type { Database } from './schema'

export const dbConnection = new Pool({
	database: process.env.VITE_DB_DATABASE,
	host: process.env.VITE_DB_HOST,
	user: process.env.VITE_DB_USERNAME,
	password: process.env.VITE_DB_PASSWORD,
	ssl: true,
})

// https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html
const dialect = new PostgresDialect({
	pool: dbConnection,
})

// https://kysely-org.github.io/kysely-apidoc/classes/Kysely.html
export const dbKysely = new Kysely<Database>({
	dialect,
})
