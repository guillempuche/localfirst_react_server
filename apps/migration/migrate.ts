import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { FileMigrationProvider, Migrator } from 'kysely'

import { dbKysely } from '@localfirst/core/db'

async function migrateToLatest() {
	try {
		const migrator = new Migrator({
			db: dbKysely,
			provider: new FileMigrationProvider({
				fs,
				path,
				migrationFolder: path.join(__dirname, './migrations'),
			}),
		})

		console.log('⏳ Starting migrations to the newest version...')

		const { error, results } = await migrator.migrateToLatest()

		console.log(results)
		if (error) throw error

		if (results === undefined || results.length === 0)
			console.log('🔍 No migrations found')
		else
			for (const it of results) {
				if (it.status === 'Success') {
					console.log(
						`✅ Migration "${it.migrationName}" was executed successfully`,
					)
				} else if (it.status === 'Error') {
					console.error(`❌ Failed to execute migration "${it.migrationName}"`)
				}
			}

		console.log('😴 Closing...')
		await dbKysely.destroy()
	} catch (error) {
		console.error('❌ Migration failed')
		console.error(error)
	}
}

migrateToLatest()
