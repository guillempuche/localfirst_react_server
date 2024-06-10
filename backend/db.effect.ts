import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Sql from '@effect/sql'
import * as Pg from '@effect/sql-pg'
import dotenv from 'dotenv'
import { Config, Effect, Struct, pipe } from 'effect'

import * as schema from './schema.effect'

// Load environment variables
dotenv.config({
	path: join(dirname(fileURLToPath(import.meta.url)), '../.env'),
})

const SqlLive = Pg.client.layer({
	database: Config.succeed(process.env.VITE_DB_DATABASE),
	host: Config.succeed(process.env.VITE_DB_HOST),
	username: Config.succeed(process.env.VITE_DB_USERNAME),
	password: Config.secret(process.env.VITE_DB_PASSWORD),
	ssl: Config.succeed(true),
})

const program = Effect.gen(function* (_) {
	const sql = yield* _(Sql.client.Client)

	const people = yield* _(
		sql<{
			readonly id: number
			readonly name: string
		}>`SELECT id, name FROM people`,
	)

	yield* _(Effect.log(`Got ${people.length} results!`))
})

pipe(program, Effect.provide(SqlLive), Effect.runPromise)
