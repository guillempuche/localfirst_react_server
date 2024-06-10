import { useEffect, useState } from 'react'

import type { Authors, Quotes } from '@backend/schema'
import { db } from '../db'

type ContentItemProps = {
	quote: Pick<Quotes, 'id' | 'text' | 'author_id'>
	author: Authors | undefined
	className?: string
}

export const ContentItem: React.FC<ContentItemProps> = ({
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
		db.updateTable('quotes')
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
			db.updateTable('authors')
				.set({
					fullname: newFullName,
				})
				.where('id', '=', author.id)
				.executeTakeFirst()
	}

	return (
		<div
			className={`rounded-2xl p-5 space-y-2 bg-green-50 dark:bg-stone-900 hover:bg-green-100 dark:hover:bg-green-900 ${className}`}
		>
			<input
				type='text'
				value={editedText}
				onChange={handleQuoteTextChange}
				className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Edit quote text'
			/>
			<input
				type='text'
				value={editedAuthorName}
				onChange={handleAuthorNameChange}
				className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Edit author name'
			/>
		</div>
	)
}
