import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import type {
	AuthorNoGeneratedQuery,
	QuoteNoGeneratedQuery,
} from '@localfirst/core/tables.effect'
import { Button } from '~components'
import { dbEffect } from '../db.effect'

type ContentItemProps = {
	quote: QuoteNoGeneratedQuery
	author: AuthorNoGeneratedQuery | undefined
	className?: string
}

export const ContentItemEffect: React.FC<ContentItemProps> = ({
	quote,
	author,
	className,
}) => {
	const [editedText, setEditedText] = useState(quote.text)
	const [editedAuthorName, setEditedAuthorName] = useState('')

	useEffect(() => {
		// Sync the edited text with quote's text if it changes externally
		setEditedText(quote.text)
	}, [quote.text])

	useEffect(() => {
		// Sync the edited name with author's fullname if it changes externally
		if (author?.fullname) setEditedAuthorName(author.fullname)
	}, [author?.fullname])

	const handleQuoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value
		setEditedText(newText)
		dbEffect
			.updateTable('quotes')
			.set({
				text: newText,
			})
			.where('id', '=', quote.id)
			.executeTakeFirst()
	}

	const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFullName = e.target.value
		setEditedAuthorName(newFullName)
		if (author)
			dbEffect
				.updateTable('authors')
				.set({
					fullname: newFullName,
				})
				.where('id', '=', author.id)
				.executeTakeFirst()
	}

	const handleRemoveQuote = () => {
		dbEffect.deleteFrom('quotes').where('id', '=', quote.id).execute()
	}

	return (
		<div
			data-component='content-item-effect'
			className={`rounded-2xl p-5 space-y-2 bg-green-50 dark:bg-stone-900 hover:bg-green-100 dark:hover:bg-green-900 ${className}`}
		>
			<input
				autoComplete='off'
				type='text'
				data-component='quote-text'
				value={editedText}
				onChange={handleQuoteTextChange}
				className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Edit quote text'
			/>
			<input
				autoComplete='off'
				type='text'
				data-component='author-name'
				value={editedAuthorName}
				onChange={handleAuthorNameChange}
				className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Edit author name'
			/>
			<Button
				onClick={handleRemoveQuote}
				className='flex items-center space-x-2 bg-red-600 hover:bg-red-500'
				tooltip='Remove quote'
			>
				<TrashIcon className='w-5 h-5' />
			</Button>
		</div>
	)
}
