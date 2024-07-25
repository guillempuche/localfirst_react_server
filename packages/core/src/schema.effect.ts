import * as S from '@effect/schema/Schema'
import { Generated } from 'effect-sql-kysely'

// Authors
export const SchemaAuthor = S.Struct({
	id: S.UUID,
	fullname: S.String,
	birth_date: S.optional(S.Date),
})
export const SchemaAuthorGeneratedId = S.Struct({
	id: Generated(S.UUID),
	fullname: S.String,
	birth_date: S.optional(S.Date),
})

// Collections
export const SchemaCollection = S.Struct({
	id: S.UUID,
	name: S.String,
	parent_id: S.optional(S.UUID),
})
export const SchemaCollectionGeneratedId = S.Struct({
	id: Generated(S.UUID),
	name: S.String,
	parent_id: S.optional(S.UUID),
})

// Editors
export const SchemaEditor = S.Struct({
	id: S.UUID,
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(S.Date),
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
})
export const SchemaEditorGeneratedId = S.Struct({
	id: Generated(S.UUID),
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(S.Date),
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
	quote_ref: S.optional(S.String),
	author_ref: S.optional(S.String),
})

// Quotes
export const SchemaQuote = S.Struct({
	id: S.UUID,
	text: S.String,
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
	created_at: S.Date,
})
export const SchemaQuoteGeneratedId = S.Struct({
	id: Generated(S.UUID),
	text: S.String,
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
	created_at: S.Date,
})
