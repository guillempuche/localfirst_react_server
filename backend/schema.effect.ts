import * as S from '@effect/schema/Schema'

// Quotes
export const SchemaQuote = S.Struct({
	id: S.UUID,
	text: S.String,
	author_id: S.optional(S.UUID),
	collections_id: S.optional(S.UUID),
	created_at: S.Date,
})

// Authors
export const SchemaAuthor = S.Struct({
	id: S.UUID,
	fullname: S.String,
	birth_date: S.optional(S.Date),
})

// Collections
export const SchemaCollection = S.Struct({
	id: S.UUID,
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
	collections_id: S.optional(S.Array(S.UUID)),
	quote_ref: S.optional(S.String),
	author_ref: S.optional(S.String),
})
