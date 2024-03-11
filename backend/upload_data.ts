import { type CrudEntry, UpdateType } from '@journeyapps/powersync-sdk-web'
import type { Request, Response } from 'express'
import { dbKysely } from './db'
import type { TableName } from './schema'

export async function uploadDataHandler(req: Request, res: Response) {
	const transactions: CrudEntry[] = req.body.transactions

	if (!transactions) {
		return res.status(400).send({ message: 'No transactions provided' })
	}

	try {
		for (const operation of transactions) {
			switch (operation.op) {
				case UpdateType.PUT:
					await dbKysely
						.insertInto(operation.table as TableName)
						.values({
							...operation.opData,
							id: operation.id,
						})
						// .onConflict('id')
						// .merge(operation.opData)
						.execute()
					break
				case UpdateType.PATCH:
					await dbKysely
						.updateTable(operation.table as TableName)
						.where('id', '=', operation.id)
						.execute()
					break
				case UpdateType.DELETE:
					await dbKysely
						.deleteFrom(operation.table as TableName)
						.where('id', '=', operation.id)
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
