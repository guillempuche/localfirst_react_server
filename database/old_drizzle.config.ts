import type { Config } from 'drizzle-kit'
import { ELECTRIC_MIGRATION_PROXY } from './old_util'

export default {
	dbCredentials: {
		connectionString: ELECTRIC_MIGRATION_PROXY,
	},
	driver: 'pg',
	out: './database/migrations',
	schema: './database/schema.ts',
	strict: true,
	verbose: true,
} satisfies Config
