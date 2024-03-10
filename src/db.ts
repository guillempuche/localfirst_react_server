import {
	Column,
	ColumnType,
	Schema,
	Table,
	WASQLitePowerSyncDatabaseOpenFactory,
} from '@journeyapps/powersync-sdk-web'
import { wrapPowerSyncWithKysely } from '@powersync/kysely-driver'

import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

// =============================================
// Kysely types

// Database with all tables
export type Database = {
	quotes: TableQuotes
	authors: TableAuthors
	collections: TableCollections
	editors: TableEditors
}

// Quotes
export interface TableQuotes {
	id: Generated<string>
	text: string
	author_id: string | null
	collections_id: string | null
	created_at: Generated<Date> | Date
}
export type Quotes = Selectable<TableQuotes>
export type QuotesNew = Insertable<TableQuotes>
export type QuotesUpdate = Updateable<TableQuotes>

// Authors
export interface TableAuthors {
	id: Generated<string>
	fullname: string
	birth_date: Date | null
}
export type Authors = Selectable<TableAuthors>
export type AuthorsNew = Insertable<TableAuthors>
export type AuthorsUpdate = Updateable<TableAuthors>

// Collections
export interface TableCollections {
	id: Generated<string>
	name: string
	parent_id: string | null
}
export type Collections = Selectable<TableCollections>
export type CollectionsNew = Insertable<TableCollections>
export type CollectionsUpdate = Updateable<TableCollections>

// Editors
export interface TableEditors {
	id: Generated<string>
	text: string | null
	fullname: string | null
	birth_date: Date | null
	author_id: string | null
	collections_id: string[] | null
	quote_ref: string | null
	author_ref: string | null
}
export type Editors = Selectable<TableEditors>
export type EditorsNew = Insertable<TableEditors>
export type EditorsUpdate = Updateable<TableEditors>

// =============================================
// SQLite schema & tables

export const sqliteSchema = new Schema([
	new Table({
		name: 'quotes',
		columns: [
			new Column({ name: 'id', type: ColumnType.TEXT }),
			new Column({ name: 'text', type: ColumnType.TEXT }),
			new Column({ name: 'author_id', type: ColumnType.TEXT }),
			new Column({ name: 'collection_id', type: ColumnType.TEXT }),
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

// For watching for new updates of the database.
export const powerSyncFactory = new WASQLitePowerSyncDatabaseOpenFactory({
	schema: sqliteSchema,
	dbFilename: `${import.meta.env.VITE_DATABASE_NAME}.sqlite`,
	flags: {
		// This is disabled once CSR+SSR functionality is verified to be working correctly
		disableSSRWarning: true,
	},
})

// For CRUD SQL queries.
export const db = wrapPowerSyncWithKysely<Database>(
	powerSyncFactory.getInstance(),
)
