import { useQuery } from '@powersync/react'
import { useEffect, useState } from 'react'

import type { Authors, Quotes } from '@backend/schema'
import { ContentItem } from '@components'
import { produce } from 'immer'
// import { db } from '../db'

export const PageHome = () => {
	const watchQuotes = useQuery<Quotes>('SELECT * FROM quotes ORDER BY id DESC')
	const watchAuthors = useQuery<Authors>('SELECT * FROM authors')
	const [quotes, setQuotes] = useState<Quotes[]>([])
	const [authors, setAuthors] = useState<Authors[]>([])

	// // Use Kysely without subscribing to changes
	// useEffect(() => {
	// 	async function fetchQuotes() {
	// 		try {
	// 			// User the query builder Kysely to the initial data.
	// 			const queriedQuotes = await db
	// 				.selectFrom('quotes')
	// 				.selectAll()
	// 				.execute()
	// 			setQuotes(queriedQuotes)

	// 			// // [Alternative] Directly using Powersync, instead of the query builder Kysely
	// 			// const quotes = await powerSync.getAll(queryAllQuotes)
	// 			// quotes.map(quote => console.debug(JSON.stringify(quote)))

	// 			// const queriedAuthors = await db
	// 			// 	.selectFrom('authors')
	// 			// 	.selectAll()
	// 			// 	.execute()
	// 			// setAuthors(queriedAuthors)
	// 		} catch (error) {
	// 			console.error('Error fetching quotes:', error)
	// 		}
	// 	}
	// 	fetchQuotes()
	// }, [])

	useEffect(() => {
		setQuotes(
			produce(draft => {
				return watchQuotes
			}),
		)

		setAuthors(
			produce(draft => {
				return watchAuthors
			}),
		)
	}, [watchQuotes, watchAuthors])

	const renderQuotes = () => {
		return quotes.map(quote => {
			const author = authors.find(a => a.id === quote.author_id)
			return <ContentItem key={quote.id} quote={quote} author={author} />
		})
	}

	return (
		<>
			<div className='flex-1 overflow-x-hidden rounded-xl space-y-4 pb-20'>
				{renderQuotes()}
			</div>
		</>
	)
}
