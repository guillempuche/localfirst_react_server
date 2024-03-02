import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'
import { PROXY_DATABASE_URL } from './util'

// export const connection = await postgres(PROXY_DATABASE_URL)
export const pool = new Pool({
	connectionString: PROXY_DATABASE_URL,
	max: 1, // Recommended for DDL migrations, docs https://orm.drizzle.team/docs/get-started-postgresql.
})

export const db = drizzle(pool, { schema })
