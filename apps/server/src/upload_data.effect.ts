// import { type CrudEntryOutputJSON, UpdateType } from '@powersync/common'
import type * as Powersync from '@powersync/common'
import type { Request, Response } from 'express'

import {
	dbKyselyEffect,
	dbKyselyEffectNoGenerated,
} from '@localfirst/core/db.effect.js'
import type { TableName } from '@localfirst/core/tables.effect.js'

export async function uploadDataHandlerEffect(req: Request, res: Response) {
	const transactions: Powersync.CrudEntryOutputJSON[] = req.body.transactions

	console.debug('Received transactions:', JSON.stringify(transactions, null, 2))

	if (!transactions || transactions.length === 0) {
		console.warn('No transactions provided')
		return res.status(400).send({ message: 'No transactions provided' })
	}

	try {
		for (const { op, type, id, data } of transactions) {
			console.debug(
				`Processing transaction: op=${op}, type=${type}, id=${id}, data=${JSON.stringify(data, null, 2)}`,
			)
			switch (op) {
				// case Powersync.UpdateType.PUT:
				case 'PUT':
					console.debug(`Executing PUT operation for type=${type}, id=${id}`)
					await dbKyselyEffect
						.insertInto(type as TableName)
						.values({
							...data,
							id,
						})
						.execute()
					console.debug(`PUT operation successful for id=${id}`)
					break
				// case Powersync.UpdateType.PATCH:
				case 'PATCH':
					console.debug(`Executing PATCH operation for type=${type}, id=${id}`)
					// Without Generated type
					await dbKyselyEffectNoGenerated
						.updateTable(type as TableName)
						.set(data as Record<string, any>)
						.where('id', '=', id)
						.execute()

					// // With Generated type
					// await dbKyselyEffect
					// 	.updateTable(type as TableName)
					// 	.set(data as Record<string, any>)
					// 	.where('id', '=', id)
					// 	.execute()
					console.debug(`PATCH operation successful for id=${id}`)
					break
				// case Powersync.UpdateType.DELETE:
				case 'DELETE':
					console.debug(`Executing DELETE operation for type=${type}, id=${id}`)
					await dbKyselyEffectNoGenerated
						.deleteFrom(type as TableName)
						.where('id', '=', id)
						.execute()
					console.debug(`DELETE operation successful for id=${id}`)
					break
				default:
					console.warn(`Unknown operation type: ${op}`)
					break
			}
		}

		console.debug('All transactions processed successfully')

		res.status(200).send({ message: 'Transactions processed successfully' })
	} catch (error) {
		console.error('Error processing transactions:', error)
		res.status(500).send({ message: 'Error processing transactions' })
	}
}
