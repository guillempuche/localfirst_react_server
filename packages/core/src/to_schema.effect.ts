import { AST, Schema as S } from '@effect/schema'
import { Column, ColumnType, Schema, Table, TableV2 } from '@powersync/common'
import { isColumnTypes } from 'effect-sql-kysely'

/**
 * Converts a Kysely schema to a PowerSync schema because PowerSync sync rules use the SQLite type system.
 *
 * More on https://docs.powersync.com/usage/sync-rules/types.
 */
export function toPowerSyncSchema<Tables extends Record<string, S.Schema.Any>>(
	tables: Tables,
): Schema {
	return new Schema(
		Object.entries(tables).map(([name, table]) => {
			const properties = AST.getPropertySignatures(
				isColumnTypes(table)
					? S.encodedSchema(table.select).ast
					: S.encodedSchema(table).ast,
			)

			// return new Table({
			// 	name,
			// 	columns: properties.map(toPowerSyncColumn),
			// })
			return new TableV2({
				options: { name },
				columns: properties.map(toPowerSyncColumn),
			})
		}),
	)
}

export function toPowerSyncColumn(property: AST.PropertySignature): Column {
	return new Column({
		name: String(property.name),
		type: toPowerSyncColumnType(property.type),
	})
}

export function toPowerSyncColumnType(ast: AST.AST): ColumnType {
	switch (ast._tag) {
		case 'StringKeyword':
			return ColumnType.TEXT
		case 'NumberKeyword':
			return ColumnType.INTEGER
		case 'Literal': {
			const type = typeof ast.literal
			if (type === 'number') {
				return ColumnType.INTEGER
			}
			if (type === 'string') {
				return ColumnType.TEXT
			}
			return unknownColumnTypeError(ast)
		}
		case 'Refinement':
		case 'Transformation':
			return toPowerSyncColumnType(ast.from)
		case 'TypeLiteral':
			return ColumnType.TEXT
		case 'Suspend':
			return toPowerSyncColumnType(ast.f())
		case 'Union': {
			const types = Array.from(
				new Set(
					ast.types
						.filter(_ => _ !== AST.undefinedKeyword)
						.map(_ => toPowerSyncColumnType(_)),
				),
			)
			if (types.length === 1 && types[0] !== undefined) {
				return types[0]
			}

			throw new Error(`Unsupported union of column types: ${types.join(', ')}`)
		}
		case 'TupleType': {
			const allTypes = [
				...ast.elements.map(e => toPowerSyncColumnType(e.type)),
				...ast.rest.map(a => toPowerSyncColumnType(a)),
			]
			if (allTypes.length === 0) {
				throw new Error('Empty tuple types are not supported')
			}
			const uniqueTypes = Array.from(new Set(allTypes))

			if (uniqueTypes.length === 1 && uniqueTypes[0] !== undefined) {
				return uniqueTypes[0]
			}

			throw new Error(
				`Unsupported tuple of mixed column types: ${uniqueTypes.join(', ')}`,
			)
		}
		default:
			return unknownColumnTypeError(ast)
	}
}

export function unknownColumnTypeError(ast: AST.AST): never {
	console.warn(`Unknown column type for AST node: ${ast._tag}`)
}
