import * as S from '@effect/schema/Schema'
import { Generated } from 'effect-sql-kysely'

// ==================================================
// Fields
// ==================================================

export const Source = S.Struct({
	url: S.String,
	publication: S.String,
}).annotations({ identifier: 'source' })

export const Metadata = S.Struct({
	source: Source,
	tags: S.Array(S.String),
}).annotations({ identifier: 'metadata' })

export const Translation = S.Struct({
	text: S.String,
	translator: S.String,
}).annotations({ identifier: 'translation' })

export const Languages = S.Struct({
	es: S.optional(Translation),
	fr: S.optional(Translation),
	de: S.optional(Translation),
	it: S.optional(Translation),
}).annotations({ identifier: 'languages' })

export const Translations = S.Struct({
	languages: Languages,
}).annotations({ identifier: 'translations' })

// ==================================================
// Entities
// ==================================================

// Authors
export const SchemaAuthor = S.Struct({
	id: S.UUID,
	fullname: S.String,
	birth_date: S.optional(S.Date),
}).annotations({ identifier: 'author' })
export const SchemaAuthorGeneratedId = S.Struct({
	id: Generated(S.UUID),
	fullname: S.String,
	birth_date: S.optional(S.Date),
}).annotations({ identifier: 'author' })

// Collections
export const SchemaCollection = S.Struct({
	id: S.UUID,
	name: S.String,
	parent_id: S.optional(S.UUID),
}).annotations({ identifier: 'collection' })
export const SchemaCollectionGeneratedId = S.Struct({
	id: Generated(S.UUID),
	name: S.String,
	parent_id: S.optional(S.UUID),
}).annotations({ identifier: 'collection' })

// Editors
export const SchemaEditor = S.Struct({
	id: S.UUID,
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(S.Date),
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
}).annotations({ identifier: 'editor' })
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
}).annotations({ identifier: 'editor' })

// Quotes
export const SchemaQuote = S.Struct({
	id: S.UUID,
	text: S.String,
	created_at: S.Date,
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
	metadata: S.optional(Metadata),
	translations: S.optional(Translations),
}).annotations({ identifier: 'quote' })
export const SchemaQuoteGeneratedId = S.Struct({
	id: Generated(S.UUID),
	text: S.String,
	created_at: S.Date,
	author_id: S.optional(S.UUID),
	// collections_id: CommaSeparatedList(S.UUID),
	collections_id: S.Data(S.Array(S.UUID)),
	metadata: S.optional(Metadata),
	translations: S.optional(Translations),
}).annotations({ identifier: 'quote' })
