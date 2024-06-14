import path from 'node:path'
import dotenv from 'dotenv'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { Database } from './schema'

// Load environment variables
dotenv.config({
	path: path.resolve(__dirname, '../../../.env'),
})

export const dbConnection = new Pool({
	database: process.env.VITE_DB_DATABASE,
	host: process.env.VITE_DB_HOST,
	user: process.env.VITE_DB_USERNAME,
	password: process.env.VITE_DB_PASSWORD,
	ssl: true,
})

// https://kysely-org.github.io/kysely-apidoc/classes/Kysely.html
export const dbKysely = new Kysely<Database>({
	// https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html
	dialect: new PostgresDialect({
		pool: dbConnection,
	}),
})
