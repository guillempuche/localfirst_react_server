import { ParseResult, Schema } from '@effect/schema'
import { Effect } from 'effect'

/**
 * Creates a schema for a comma-separated list of items.
 *
 * @template A - The type of the item in the list.
 * @template R - The type of the result after decoding.
 * @param {Schema.Schema<A, string, R>} item - The schema for the individual items.
 * @returns {Schema.Schema<string, A[], R[]>} - A schema that handles a comma-separated list of items.
 *
 * @example
 * const CommaSeparatedStringList = CommaSeparatedList(Schema.String);
 * const decodeSync = Schema.decodeSync(CommaSeparatedStringList);
 * const encodeSync = Schema.encodeSync(CommaSeparatedStringList);
 *
 * const decoded = decodeSync(`a,b,c,d`); // ['a', 'b', 'c', 'd']
 * const encoded = encodeSync(['a', 'b', 'c', 'd']); // 'a,b,c,d'
 */
export const CommaSeparatedList = <A, R>(item: Schema.Schema<A, string, R>) => {
	const encodeItem = ParseResult.encode(Schema.encodedSchema(item))
	const decodeItem = ParseResult.decode(Schema.encodedSchema(item))

	return Schema.transformOrFail(Schema.String, Schema.Array(item), {
		decode: str => {
			const items = str.split(/,/g).flatMap(x => {
				const trimmed = x.trim()
				return trimmed ? [trimmed] : []
			})

			return Effect.forEach(items, i => decodeItem(i))
		},
		encode: arr =>
			Effect.map(
				Effect.forEach(arr, i => encodeItem(i)),
				items => items.join(','),
			),
	})
}
