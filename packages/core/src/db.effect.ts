import path from 'node:path'
import dotenv from 'dotenv'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { EffectDatabase, EffectDatabaseGeneratedId } from './tables.effect'

// Load environment variables
dotenv.config({
	path: path.resolve(__dirname, '../../../.env'),
})

export const dbConnectionEffect = new Pool({
	database: process.env.VITE_DB_DATABASE,
	host: process.env.VITE_DB_HOST,
	user: process.env.VITE_DB_USERNAME,
	password: process.env.VITE_DB_PASSWORD,
	ssl: true,
})

// Without Generated type
export const dbKyselyEffect = new Kysely<EffectDatabase>({
	dialect: new PostgresDialect({
		pool: dbConnectionEffect,
	}),
})

// With Generated type
export const dbKyselyEffectGeneratedId = new Kysely<EffectDatabaseGeneratedId>({
	// https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html
	dialect: new PostgresDialect({
		pool: dbConnectionEffect,
	}),
})
