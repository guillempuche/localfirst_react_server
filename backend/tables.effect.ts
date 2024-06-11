import { Table } from 'effect-sql-kysely'

import {
	SchemaAuthor,
	SchemaCollection,
	SchemaEditor,
	SchemaQuote,
} from './schema.effect'

// Database with all tables
export type EffectDatabase = {
	authors: TableAuthors
	collections: TableCollections
	editors: TableEditors
	quotes: TableQuotes
}

// Quotes
export const TableQuotes = Table({ SchemaQuote })
type TableQuotes = typeof TableQuotes

// Authors
export const TableAuthors = Table({ SchemaAuthor })
type TableAuthors = typeof TableAuthors

// Collections
export const TableCollections = Table({ SchemaCollection })
type TableCollections = typeof TableCollections

// Editors
export const TableEditors = Table({ SchemaEditor })
type TableEditors = typeof TableEditors

export type TableName = 'quotes' | 'authors' | 'collections' | 'editors'
