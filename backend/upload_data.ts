import {
	type CrudEntryOutputJSON,
	UpdateType,
} from '@journeyapps/powersync-sdk-web'
import type { Request, Response } from 'express'
import { dbKysely } from './db'
import type { TableName } from './schema'

export async function uploadDataHandler(req: Request, res: Response) {
	const transactions: CrudEntryOutputJSON[] = req.body.transactions

	if (!transactions || transactions.length === 0) {
		return res.status(400).send({ message: 'No transactions provided' })
	}

	try {
		for (const { op, type, id, data } of transactions) {
			switch (op) {
				case UpdateType.PUT:
					await dbKysely
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
					await dbKysely
						.updateTable(type as TableName)
						.set(data as Record<string, any>)
						.where('id', '=', id)
						.execute()
					break
				case UpdateType.DELETE:
					await dbKysely
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
