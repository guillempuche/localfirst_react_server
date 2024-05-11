import * as S from '@effect/schema/Schema'
import { Temporal } from 'temporal-polyfill'

// ======================================
// Types

const ZonedDateTime = S.instanceOf(Temporal.ZonedDateTime)

/**
 * A semantic version string ("`major.minor.path`" format, e.g. "1.2.3").
 */
// type Version = string & Brand.Brand<'Version'>
// const Version = Brand.refined<Version>(
// 	str => /^\d+\.\d+\.\d+$/.test(str), // Ensure "<major>.<minor>.<patch>" and no leading or trailing whitespace
// 	str => Brand.error(`Expected "<major>.<minor>.<patch>" but got ${str}`),
// )
const Version = S.String.pipe(
	S.pattern(/^\d+\.\d+\.\d+$/), // Ensure "<major>.<minor>.<patch>" and no leading or trailing
)

// ======================================
// Entities

export const SchemaEntity = S.Struct({
	id: S.UUID,
	version: Version,
})
export type Entity = typeof SchemaEntity.Type

// Content
export const SchemaContent = S.extend(
	S.Struct({
		created_by_id: S.UUID,
		created_at: ZonedDateTime, // TODO: Temporal.ZonedDateTime
		updated_at: S.optional(ZonedDateTime), // TODO: Temporal.ZonedDateTime
	}),
	SchemaEntity,
)
export type Content = typeof SchemaContent.Type

// Author
export const SchemaAuthor = S.extend(
	S.Struct({
		fullname: S.String,
	}),
	SchemaContent,
)
export type Author = typeof SchemaAuthor.Type

// Collection
export const SchemaCollection = S.extend(
	S.Struct({
		name: S.String,
		description: S.optional(S.String),
	}),
	SchemaContent,
)
export type Collection = typeof SchemaCollection.Type

export const SchemaQuote = S.extend(
	S.Struct({
		text: S.String,
		author_id: S.optional(S.UUID),
		collections_id: S.Array(S.UUID),
	}),
	SchemaContent,
)
export type Quote = typeof SchemaQuote.Type

export const SchemaEditor = S.Struct({
	// Quote related
	text: S.optional(S.String),
	quote_id: S.optional(S.UUID), // Used when an existing quote is being edited

	// Author related
	author_id: S.optional(S.UUID), // Used when an existing author is being edited
	fullname: S.optional(S.String),

	// Collection related
	collections_id: S.optional(S.Array(S.UUID)),
})
export type Editor = typeof SchemaEditor.Type
