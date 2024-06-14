import { wrapPowerSyncWithKysely } from '@powersync/kysely-driver'
import { WASQLitePowerSyncDatabaseOpenFactory } from '@powersync/web'

import type { EffectDatabaseNoGenerated } from '@localfirst/core/tables.effect'
import {
	TableAuthorsNoGenerated,
	TableCollectionsNoGenerated,
	TableEditorsNoGenerated,
	TableQuotesNoGenerated,
} from '@localfirst/core/tables.effect'
import { toPowerSyncSchema } from '@localfirst/core/to_schema.effect'

// =============================================
// SQLite schema & tables

// Convert tables to PowerSync schema
export const sqliteSchemaEffect = toPowerSyncSchema({
	authors: TableAuthorsNoGenerated,
	collections: TableCollectionsNoGenerated,
	editors: TableEditorsNoGenerated,
	quotes: TableQuotesNoGenerated,
})

// The primary functions are to record all changes in the local database,
// whether online or offline. In addition, it automatically uploads changes
// to your app backend when connected.
// More here https://docs.powersync.com/client-sdk-references/js-web
export const powerSyncFactoryEffect = new WASQLitePowerSyncDatabaseOpenFactory({
	schema: sqliteSchemaEffect,
	dbFilename: `${import.meta.env.VITE_DB_DATABASE}.sqlite`,
	flags: {
		// This is disabled once CSR+SSR functionality is verified to be working correctly
		disableSSRWarning: true,
	},
})

// For CRUD SQL queries.
export const dbEffect = wrapPowerSyncWithKysely<EffectDatabaseNoGenerated>(
	powerSyncFactoryEffect.getInstance(),
)

export interface Quote {
	id: string
	text: string
	author_id: string
	collections_id: string
	created_at: string
}

export interface Author {
	id: string
	fullname: string
	birth_date: string
}

export interface Collection {
	id: string
	name: string
	parent_id: string
}

export interface Editor {
	id: string
	text: string
	fullname: string
	birth_date: string // Consider using Date or string
	author_id: string
	collections_id: string
	quote_ref: string
	author_ref: string
}
