import { useQuery } from '@powersync/react'
import { useEffect, useState } from 'react'

import type { AuthorQuery, QuoteQuery } from '@localfirst/core/tables.effect'
import { Button, ContentItemEffect, EditorEffect } from '~components'
import { dbEffect } from '~effect'

export const PageHomeEffect = () => {
	const watchQuotes = useQuery<QuoteQuery>(
		'SELECT * FROM quotes ORDER BY id DESC',
	)
	const watchQuotesEffect = useQuery(
		dbEffect.selectFrom('quotes').orderBy('id', 'desc').selectAll(),
	)
	const watchAuthorsEffect = useQuery<AuthorQuery>('SELECT * FROM authors')
	const [quotes, setQuotes] = useState<QuoteQuery[]>([])
	const [authors, setAuthors] = useState<AuthorQuery[]>([])
	const [isEditorVisible, setIsEditorVisible] = useState(false)

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

	const handleSave = () => {
		// Refresh quotes and authors after save
		if (watchQuotes?.data) {
			setQuotes(watchQuotes.data)
		}
		if (watchAuthorsEffect?.data) {
			setAuthors(watchAuthorsEffect.data)
		}
		setIsEditorVisible(false)
	}

	const handleCancel = () => {
		setIsEditorVisible(false)
	}

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
			{!isEditorVisible && (
				<Button
					onClick={() => setIsEditorVisible(true)}
					className='bg-blue-600 hover:bg-blue-500'
				>
					Add Quote
				</Button>
			)}
			{isEditorVisible && (
				<EditorEffect
					authors={authors}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			)}
			{renderQuotes()}
		</div>
	)
}
