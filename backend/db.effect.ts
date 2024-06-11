import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Pg from '@effect/sql-pg'
import dotenv from 'dotenv'
import { Config } from 'effect'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { EffectDatabase, EffectDatabaseNoGenerated } from './tables.effect'

// Load environment variables
dotenv.config({
	path: join(dirname(fileURLToPath(import.meta.url)), '../.env'),
})

export const dbConnectionEffect = new Pool({
	database: process.env.VITE_DB_DATABASE,
	host: process.env.VITE_DB_HOST,
	user: process.env.VITE_DB_USERNAME,
	password: process.env.VITE_DB_PASSWORD,
	ssl: true,
})

// Without Generated type
export const dbKyselyEffectNoGenerated = new Kysely<EffectDatabaseNoGenerated>({
	dialect: new PostgresDialect({
		pool: dbConnectionEffect,
	}),
})

// With Generated type
export const dbKyselyEffect = new Kysely<EffectDatabase>({
	// https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html
	dialect: new PostgresDialect({
		pool: dbConnectionEffect,
	}),
})

export const SqlLive = Pg.client.layer({
	database: Config.succeed(process.env.VITE_DB_DATABASE),
	host: Config.succeed(process.env.VITE_DB_HOST),
	username: Config.succeed(process.env.VITE_DB_USERNAME),
	password: Config.redacted(process.env.VITE_DB_PASSWORD),
	ssl: Config.succeed(true),
})
