// schema.effect-kysely.ts
import * as S from '@effect/schema/Schema'
import { ColumnType, Generated, Table } from 'effect-sql-kysely'

// Quotes
export const QuotesSchema = Table({
	id: Generated(S.UUID),
	text: S.String,
	author_id: S.optional(S.UUID),
	collections_id: S.optional(S.UUID),
	created_at: ColumnType(S.Date, S.Date, S.Date),
})

// Authors
export const AuthorsSchema = Table({
	id: Generated(S.UUID),
	fullname: S.String,
	birth_date: S.optional(ColumnType(S.Date, S.Date, S.Date)),
})

// Collections
export const CollectionsSchema = Table({
	id: Generated(S.UUID),
	name: S.String,
	parent_id: S.optional(S.UUID),
})

// Editors
export const EditorsSchema = Table({
	id: Generated(S.UUID),
	text: S.optional(S.String),
	fullname: S.optional(S.String),
	birth_date: S.optional(ColumnType(S.Date, S.Date, S.Date)),
	author_id: S.optional(S.UUID),
	collections_id: S.optional(S.Array(S.UUID)),
	quote_ref: S.optional(S.String),
	author_ref: S.optional(S.String),
})
