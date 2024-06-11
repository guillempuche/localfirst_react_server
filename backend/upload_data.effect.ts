import { type CrudEntryOutputJSON, UpdateType } from '@powersync/web'
import type { Request, Response } from 'express'

import { dbKyselyEffect } from './db.effect'
import type { TableName } from './tables.effect'

export async function uploadDataHandlerEffect(req: Request, res: Response) {
	const transactions: CrudEntryOutputJSON[] = req.body.transactions

	if (!transactions || transactions.length === 0) {
		return res.status(400).send({ message: 'No transactions provided' })
	}

	try {
		for (const { op, type, id, data } of transactions) {
			switch (op) {
				case UpdateType.PUT:
					await dbKyselyEffect
						.insertInto(type as TableName)
						.values({
							...data,
							id,
						})
						// .onConflict('id')
						// .merge(operation.opData)
						.execute()
					break
				case UpdateType.PATCH:
					await dbKyselyEffect
						.updateTable(type as TableName)
						.set(data as Record<string, any>)
						.where('id', '=', id)
						.execute()
					break
				case UpdateType.DELETE:
					await dbKyselyEffect
						.deleteFrom(type as TableName)
						.where('id', '=', id)
						.execute()
					break
			}
		}

		res.status(200).send({ message: 'Transactions processed successfully' })
	} catch (error) {
		console.error('Error processing transactions:', error)
		res.status(500).send({ message: 'Error processing transactions' })
	}
}
