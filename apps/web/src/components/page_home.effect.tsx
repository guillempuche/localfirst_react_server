import { useQuery } from '@powersync/react'
import { useEffect, useState } from 'react'

import type {
	AuthorNoGeneratedQuery,
	QuoteNoGeneratedQuery,
} from '@localfirst/core/tables.effect'
import { ContentItemEffect } from '~components'

export const PageHomeEffect = () => {
	// const watchQuotes = useQuery<Quotes>('SELECT * FROM quotes ORDER BY id DESC')
	const watchQuotes = useQuery<QuoteNoGeneratedQuery>(
		'SELECT * FROM quotes ORDER BY id DESC',
	)
	// const watchAuthors = useQuery<Authors>('SELECT * FROM authors')
	const watchAuthorsEffect = useQuery<AuthorNoGeneratedQuery>(
		'SELECT * FROM authors',
	)
	// const [quotes, setQuotes] = useState<Quotes[]>([])
	// const [authors, setAuthors] = useState<Authors[]>([])
	const [quotes, setQuotes] = useState<QuoteNoGeneratedQuery[]>([])
	const [authors, setAuthors] = useState<AuthorNoGeneratedQuery[]>([])

	useEffect(() => {
		if (watchQuotes?.data) {
			setQuotes(watchQuotes.data)
		}
	}, [watchQuotes])

	useEffect(() => {
		if (watchAuthorsEffect?.data) {
			setAuthors(watchAuthorsEffect.data)
		}
	}, [watchAuthorsEffect])

	const renderQuotes = () => {
		return quotes.map(quote => {
			const author = authors.find(a => a.id === quote.author_id)
			return <ContentItemEffect key={quote.id} quote={quote} author={author} />
		})
	}

	if (!quotes.length)
		return (
			<div
				data-component='page-home-effect'
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
			data-component='page-home-effect'
			className='flex-1 overflow-x-hidden rounded-xl space-y-4 pb-20'
		>
			{renderQuotes()}
		</div>
	)
}
