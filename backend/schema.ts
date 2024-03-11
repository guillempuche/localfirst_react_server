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

export type TableName = 'quotes' | 'authors' | 'collections' | 'editors'
