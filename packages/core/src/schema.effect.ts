import * as S from '@effect/schema/Schema'
import { Generated } from 'effect-sql-kysely'
import { CommaSeparatedList } from './utils'

// Authors
export const SchemaAuthorNoGenerated = S.Struct({
	id: S.UUID,
	fullname: S.String,
	birth_date: S.optional(S.Date),
})
export const SchemaAuthor = S.Struct({
	id: Generated(S.UUID),
	fullname: S.String,
	birth_date: S.optional(S.Date),
})

// Collections
export const SchemaCollectionNoGenerated = S.Struct({
	id: S.UUID,
	name: S.String,
	parent_id: S.optional(S.UUID),
})
export const SchemaCollection = S.Struct({
	id: Generated(S.UUID),
	name: S.String,
	parent_id: S.optional(S.UUID),
})

// Editors
export const SchemaEditorNoGenerated = S.Struct({
	id: S.UUID,
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(S.Date),
	author_id: S.optional(S.UUID),
	collections_id: CommaSeparatedList(S.UUID),
})
export const SchemaEditor = S.Struct({
	id: Generated(S.UUID),
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(S.Date),
	author_id: S.optional(S.UUID),
	collections_id: CommaSeparatedList(S.UUID),
	quote_ref: S.optional(S.String),
	author_ref: S.optional(S.String),
})

// Quotes
export const SchemaQuoteNoGenerated = S.Struct({
	id: S.UUID,
	text: S.String,
	author_id: S.optional(S.UUID),
	collections_id: S.optional(S.UUID),
	created_at: S.Date,
})
export const SchemaQuote = S.Struct({
	id: Generated(S.UUID),
	text: S.String,
	author_id: S.optional(S.UUID),
	collections_id: S.optional(S.UUID),
	created_at: S.Date,
})
