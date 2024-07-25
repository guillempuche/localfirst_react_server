import { useState } from 'react'
import { v7 as uuid } from 'uuid'

import type { AuthorQuery } from '@localfirst/core/tables.effect'
import { dbEffect } from '~effect'
import { Button } from './button'

type EditorProps = {
	onSave: () => void
	onCancel: () => void
	authors: AuthorQuery[]
}

export const EditorEffect: React.FC<EditorProps> = ({
	onSave,
	onCancel,
	authors,
}) => {
	const [quoteText, setQuoteText] = useState('')
	const [authorId, setAuthorId] = useState<string | undefined>(undefined)
	const [authorName, setAuthorName] = useState('')

	const handleAuthorChange = (authorId: string) => {
		setAuthorId(authorId)
		if (authorId) {
			const selectedAuthor = authors.find(a => a.id === authorId)
			if (selectedAuthor) {
				setAuthorName(selectedAuthor.fullname)
			}
		} else {
			setAuthorName('')
		}
	}

	const handleSave = async () => {
		let finalAuthorId = authorId

		if (!finalAuthorId && authorName) {
			const existingAuthor = authors.find(a => a.fullname === authorName)
			if (existingAuthor) finalAuthorId = existingAuthor.id
			else {
				finalAuthorId = uuid()
				await dbEffect
					.insertInto('authors')
					.values({
						id: finalAuthorId,
						fullname: authorName,
					})
					.executeTakeFirst()
			}
		}

		await dbEffect
			.insertInto('quotes')
			.values({
				id: uuid(),
				text: quoteText,
				author_id: finalAuthorId,
				collections_id: [],
				created_at: new Date().toDateString(),
			})
			.executeTakeFirst()

		// Trigger onSave callback
		onSave()
	}

	return (
		<div
			className='p-4 bg-gray-100 dark:bg-stone-800 rounded-2xl space-y-3'
			data-component='editor-effect'
		>
			<input
				autoComplete='off'
				data-component='editor-quote'
				type='text'
				value={quoteText}
				onChange={e => setQuoteText(e.target.value)}
				className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Enter quote text'
			/>

			<div>
				<label className='block text-gray-700 dark:text-gray-300'>
					(Optional) New or existing author
				</label>
				<select
					className='w-full p-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
					onChange={e => handleAuthorChange(e.target.value)}
					value={authorId || ''}
				>
					<option value=''>New</option>
					{authors.map(author => (
						<option key={author.id} value={author.id}>
							{author.fullname}
						</option>
					))}
				</select>
			</div>
			<input
				autoComplete='off'
				data-component='editor-fullname'
				type='text'
				value={authorName}
				onChange={e => setAuthorName(e.target.value)}
				className='w-full p-2 mt-2 rounded border-2 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-stone-800 dark:text-gray-100'
				placeholder='Enter author name'
			/>
			<Button
				onClick={handleSave}
				className='bg-green-6000 hover:bg-green-500'
				tooltip='Save/Update'
			>
				Save
			</Button>
			<Button
				onClick={onCancel}
				className='bg-gray-600 hover:bg-gray-500'
				tooltip='Cancel'
			>
				Cancel
			</Button>
		</div>
	)
}
