import { Table } from 'effect-sql-kysely'

import {
	SchemaAuthor,
	SchemaAuthorNoGenerated,
	SchemaCollection,
	SchemaCollectionNoGenerated,
	SchemaEditor,
	SchemaEditorNoGenerated,
	SchemaQuote,
	SchemaQuoteNoGenerated,
} from './schema.effect'

// ========================
// Tables

// Database with all tables
export type EffectDatabaseNoGenerated = {
	authors: TableAuthorsNoGeneratedNoTable
	collections: TableCollectionsNoGeneratedNoTable
	editors: TableEditorsNoGeneratedNoTable
	quotes: TableQuotesNoGeneratedNoTable
}
export type EffectDatabase = {
	authors: TableAuthors
	collections: TableCollections
	editors: TableEditors
	quotes: TableQuotes
}

export type TableName = 'quotes' | 'authors' | 'collections' | 'editors'

// ========================
// Authors

// Without Generated type
export const TableAuthorsNoGenerated = Table(SchemaAuthorNoGenerated.fields)
type TableAuthorsNoGenerated = typeof TableAuthorsNoGenerated.Encoded
// Or without Generated type and table
export type TableAuthorsNoGeneratedNoTable =
	typeof SchemaAuthorNoGenerated.Encoded

// With Generated type
export const TableAuthors = Table(SchemaAuthor.fields)
type TableAuthors = typeof TableAuthors.Encoded

// ========================
// Collections

// Without Generated type
export const TableCollectionsNoGenerated = Table(
	SchemaCollectionNoGenerated.fields,
)
type TableCollectionsNoGenerated = typeof TableCollectionsNoGenerated.Encoded
// Or without Generated type and table
export type TableCollectionsNoGeneratedNoTable =
	typeof SchemaCollectionNoGenerated.Encoded

// With Generated type
export const TableCollections = Table(SchemaCollection.fields)
type TableCollections = typeof TableCollections.Encoded

// ========================
// Editors

// Without Generated type
export const TableEditorsNoGenerated = Table(SchemaEditorNoGenerated.fields)
type TableEditorsNoGenerated = typeof TableEditorsNoGenerated.Encoded
// Or without Generated type and table
export type TableEditorsNoGeneratedNoTable =
	typeof SchemaEditorNoGenerated.Encoded

// With Generated type
export const TableEditors = Table(SchemaEditor.fields)
type TableEditors = typeof TableEditors.Encoded

// ========================
// Quotes

// Without Generated type
export const TableQuotesNoGenerated = Table(SchemaQuoteNoGenerated.fields)
type TableQuotesNoGenerated = typeof TableQuotesNoGenerated.Encoded
// Or without Generated type and table
export type TableQuotesNoGeneratedNoTable =
	typeof SchemaQuoteNoGenerated.Encoded

// With Generated type
export const TableQuotes = Table(SchemaQuote.fields)
type TableQuotes = typeof TableQuotes.Encoded
