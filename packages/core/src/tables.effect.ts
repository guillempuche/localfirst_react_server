import { Table } from 'effect-sql-kysely'

import type { Insertable, Selectable, Updateable } from 'kysely'
import {
	SchemaAuthor,
	SchemaAuthorGeneratedId,
	SchemaCollection,
	SchemaCollectionGeneratedId,
	SchemaEditor,
	SchemaEditorGeneratedId,
	SchemaQuote,
	SchemaQuoteGeneratedId,
} from './schema.effect'

// ========================
// Tables

// Database with all tables
export type EffectDatabase = {
	authors: TableAuthorsNoTable
	collections: TableCollectionsNoTable
	editors: TableEditorsNoTable
	quotes: TableQuotesNoTable
}
export type EffectDatabaseGeneratedId = {
	authors: TableAuthorsGeneratedId
	collections: TableCollectionsGeneratedId
	editors: TableEditorsGeneratedId
	quotes: TableQuotesGeneratedId
}

export type TableName = 'quotes' | 'authors' | 'collections' | 'editors'

// ========================
// Authors

// Without Generated type
export const TableAuthors = Table(SchemaAuthor.fields)
type TableAuthors = typeof TableAuthors.Encoded
// Or without table
export type TableAuthorsNoTable = typeof SchemaAuthor.Encoded

// Kysely actions
export type AuthorQuery = Selectable<TableAuthorsNoTable>
export type AuthorInsert = Insertable<TableAuthorsNoTable>
export type AuthorUpdate = Updateable<TableAuthorsNoTable>

// With Generated type
export const TableAuthorsGeneratedId = Table(SchemaAuthorGeneratedId.fields)
type TableAuthorsGeneratedId = typeof TableAuthorsGeneratedId.Encoded

// ========================
// Collections

// Without Generated type
export const TableCollections = Table(SchemaCollection.fields)
type TableCollections = typeof TableCollections.Encoded
// Or without table
export type TableCollectionsNoTable = typeof SchemaCollection.Encoded

// With Generated type
export const TableCollectionsGeneratedId = Table(
	SchemaCollectionGeneratedId.fields,
)
type TableCollectionsGeneratedId = typeof TableCollectionsGeneratedId.Encoded

// ========================
// Editors

// Without Generated type
export const TableEditors = Table(SchemaEditor.fields)
type TableEditors = typeof TableEditors.Encoded
// Or without table
export type TableEditorsNoTable = typeof SchemaEditor.Encoded

// With Generated type
export const TableEditorsGeneratedId = Table(SchemaEditorGeneratedId.fields)
type TableEditorsGeneratedId = typeof TableEditorsGeneratedId.Encoded

// ========================
// Quotes

// Without Generated type
export const TableQuotes = Table(SchemaQuote.fields)
type TableQuotes = typeof TableQuotes.Encoded
// Or without table
export type TableQuotesNoTable = typeof SchemaQuote.Encoded

// Kysely actions
export type QuoteQuery = Selectable<TableQuotesNoTable>
export type QuoteInsert = Insertable<TableQuotesNoTable>
export type QuoteUpdate = Updateable<TableQuotesNoTable>

// With Generated type
export const TableQuotesGeneratedId = Table(SchemaQuoteGeneratedId.fields)
type TableQuotesGeneratedId = typeof TableQuotesGeneratedId.Encoded
