import { useQuery } from '@powersync/react'
import { useEffect, useState } from 'react'

import type { Authors, Quotes } from '@localfirst/core/schema'
import { db } from 'src/db'
import { ContentItem } from '~components'

export const PageHome = () => {
	// const watchQuotes = useQuery<Quotes>('SELECT * FROM quotes ORDER BY id DESC')
	const watchQuotes = useQuery(
		db.selectFrom('quotes').orderBy('id', 'desc').selectAll(),
	)
	const watchAuthors = useQuery<Authors>('SELECT * FROM authors')
	const [quotes, setQuotes] = useState<Quotes[]>([])
	const [authors, setAuthors] = useState<Authors[]>([])

	useEffect(() => {
		if (watchQuotes?.data) {
			setQuotes(watchQuotes.data)
		}
	}, [watchQuotes])

	useEffect(() => {
		if (watchAuthors?.data) {
			setAuthors(watchAuthors.data)
		}
	}, [watchAuthors])

	const renderQuotes = () => {
		return quotes.map(quote => {
			const author = authors.find(a => a.id === quote.author_id)
			return <ContentItem key={quote.id} quote={quote} author={author} />
		})
	}

	if (!quotes.length)
		return (
			<div
				data-component='page-home'
				className='flex-1 overflow-x-hidden rounded-xl space-y-4 pb-20'
			>
				<div className='flex items-center justify-center h-96'>
					<h2 className='text-2xl font-semibold text-gray-500 dark:text-gray-400'>
						No quotes found
					</h2>
				</div>
			</div>
		)

	return (
		<div
			data-component='page-home'
			className='flex-1 overflow-x-hidden rounded-xl space-y-4 pb-20'
		>
			{renderQuotes()}
		</div>
	)
}
