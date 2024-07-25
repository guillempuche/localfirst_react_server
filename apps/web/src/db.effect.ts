import { wrapPowerSyncWithKysely } from '@powersync/kysely-driver'
import { PowerSyncDatabase } from '@powersync/web'

import type { EffectDatabase } from '@localfirst/core/tables.effect'
import {
	TableAuthors,
	TableCollections,
	TableEditors,
	TableQuotes,
} from '@localfirst/core/tables.effect'
import { toPowerSyncSchema } from '@localfirst/core/to_schema.effect'

// =============================================
// SQLite schema & tables

// Convert tables to PowerSync schema
export const sqliteSchemaEffect = toPowerSyncSchema({
	authors: TableAuthors,
	collections: TableCollections,
	editors: TableEditors,
	quotes: TableQuotes,
})

// The primary functions are to record all changes in the local database,
// whether online or offline. In addition, it automatically uploads changes
// to your app backend when connected.
// More here https://docs.powersync.com/client-sdk-references/js-web
export const powerSyncInstanceEffect = new PowerSyncDatabase({
	schema: sqliteSchemaEffect,
	database: {
		dbFilename: `${import.meta.env.VITE_DB_DATABASE}.sqlite`,
	},
	flags: {
		// This is disabled once CSR+SSR functionality is verified to be working correctly
		disableSSRWarning: true,
	},
})

// For CRUD SQL queries.
export const dbEffect = wrapPowerSyncWithKysely<EffectDatabase>(
	powerSyncInstanceEffect,
)
