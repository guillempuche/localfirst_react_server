import {
	type AnyPgColumn,
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

export const quotes = pgTable('quotes', {
	id: uuid('id').primaryKey(),
	text: text('text').notNull(),
	createdAt: timestamp('created_at').notNull(), // Removed .defaultNow()
	isDraft: boolean('is_draft').notNull(), // Removed .default(false)
	authorRef: uuid('author_ref').references(() => authors.id),
	collectionRef: uuid('collection_ref').references(() => collections.id),
	fork: uuid('fork').references((): AnyPgColumn => quotes.id),
})

export const authors = pgTable('authors', {
	id: uuid('id').primaryKey(),
	fullname: text('fullname').notNull(),
	isDraft: boolean('is_draft').notNull(), // Removed .default(false)
	fork: uuid('fork').references((): AnyPgColumn => authors.id),
	birthDate: timestamp('birth_date'),
})

export const collections = pgTable('collections', {
	id: uuid('id').primaryKey(),
	name: text('fullname').notNull(),
	parentRef: uuid('parent_ref').references((): AnyPgColumn => collections.id),
	fork: uuid('fork').references((): AnyPgColumn => collections.id),
})
