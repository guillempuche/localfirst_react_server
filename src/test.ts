import { db } from './db'

console.log('Fetching...')
try {
	const quotes = await db.selectFrom('quotes').selectAll().execute()
	console.log(`Quotes: ${quotes}`)
} catch (error) {
	console.error('Error fetching quotes:', error)
}
