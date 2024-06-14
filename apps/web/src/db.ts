import { wrapPowerSyncWithKysely } from '@powersync/kysely-driver'
import {
	Column,
	ColumnType,
	Schema,
	Table,
	WASQLitePowerSyncDatabaseOpenFactory,
} from '@powersync/web'

import type { Database } from '@localfirst/core/schema'

// =============================================
// SQLite schema & tables

export const sqliteSchema = new Schema([
	new Table({
		name: 'quotes',
		columns: [
			new Column({ name: 'id', type: ColumnType.TEXT }),
			new Column({ name: 'text', type: ColumnType.TEXT }),
			new Column({ name: 'author_id', type: ColumnType.TEXT }),
			new Column({ name: 'collections_id', type: ColumnType.TEXT }),
			new Column({ name: 'created_at', type: ColumnType.TEXT }),
		],
	}),
	new Table({
		name: 'authors',
		columns: [
			new Column({ name: 'id', type: ColumnType.TEXT }),
			new Column({ name: 'fullname', type: ColumnType.TEXT }),
			new Column({ name: 'birth_date', type: ColumnType.TEXT }),
		],
	}),
	new Table({
		name: 'collections',
		columns: [
			new Column({ name: 'id', type: ColumnType.TEXT }),
			new Column({ name: 'name', type: ColumnType.TEXT }),
			new Column({ name: 'parent_id', type: ColumnType.TEXT }),
		],
	}),
	new Table({
		name: 'editors',
		columns: [
			new Column({ name: 'id', type: ColumnType.TEXT }),
			new Column({ name: 'text', type: ColumnType.TEXT }),
			new Column({ name: 'fullname', type: ColumnType.TEXT }),
			new Column({ name: 'birth_date', type: ColumnType.TEXT }),
			new Column({ name: 'author_id', type: ColumnType.TEXT }),
			new Column({ name: 'collections_id', type: ColumnType.TEXT }),
			new Column({ name: 'quote_ref', type: ColumnType.TEXT }),
			new Column({ name: 'author_ref', type: ColumnType.TEXT }),
		],
	}),
])

// The primary functions are to record all changes in the local database,
// whether online or offline. In addition, it automatically uploads changes
// to your app backend when connected.
// More here https://docs.powersync.com/client-sdk-references/js-web
export const powerSyncFactory = new WASQLitePowerSyncDatabaseOpenFactory({
	schema: sqliteSchema,
	dbFilename: `${import.meta.env.VITE_DB_DATABASE}.sqlite`,
	flags: {
		// This is disabled once CSR+SSR functionality is verified to be working correctly
		disableSSRWarning: true,
	},
})

// For CRUD SQL queries.
export const db = wrapPowerSyncWithKysely<Database>(
	powerSyncFactory.getInstance(),
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
