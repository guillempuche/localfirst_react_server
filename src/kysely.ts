import { Kysely, PostgresDialect } from 'kysely'

import { connnection } from '../database/config'
import type { Database } from './db'

const dialect = new PostgresDialect({
	pool: connnection,
})

export const db = new Kysely<Database>({
	dialect,
})
