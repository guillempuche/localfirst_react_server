// import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { db, postgresClient } from './schema'

// Run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './database/migrations' })
	.then(async () => {
		console.log('✅ Migrations complete')
		await postgresClient.end()
		process.exit(0)
	})
	.catch(err => {
		console.error('❌ Migrations failed', err)
		process.exit(1)
	})
