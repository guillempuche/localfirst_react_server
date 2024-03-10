import {
	ChevronDownIcon,
	ChevronUpIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import type React from 'react'

import { Button } from '@/common_ui'
import { type ActorEditor, actorEditorsManager, actorLibrary } from '../actors'

type EditorProps = {
	editor: ActorEditor
}

interface EditorPropsDefault
	extends EditorProps,
		React.HTMLAttributes<HTMLDivElement> {}

export const Editor: React.FC<EditorPropsDefault> = ({ editor, className }) => {
	// // Use React hook to react to the editor changes when some of its internal
	// // values change, like quote or quote.
	// const editorState = useActor(editor)

	const hasAuthor = () =>
		editorState.quote.some && editorState.quote.val.authorRef.some

	// Determine the text to be shown in the tooltip
	const tooltipText = editorState.quote.some
		? editorState.quote.val.text.length > 25
			? `${editorState.quote.val.text.substring(0, 25)}...`
			: editorState.quote.val.text
		: 'Empty'

	const handleQuoteChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value

		if (text.length > 0 && editorState.quote.some)
			editorState.quote.val.setText(text)
	}

	const handleAuthorChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value

		if (text.length > 0 && editorState.author.some)
			editorState.author.val.setFullname(text)
	}

	// Show the complete editor
	if (editorState.showUi)
		return (
			<div className={classNames('relative w-full', className)}>
				<div className='absolute flex right-1 space-x-1'>
					<Button
						tooltip='ACTION: ActorEditor.setShowUi'
						onClick={() => editorState.setShowUi(false)}
						className='dark:bg-gray-200 dark:hover:bg-gray-400 rounded-full'
					>
						<ChevronDownIcon className='h-4 w-4 text-gray-700' />
					</Button>
					<Button
						tooltip='ACTION: ActorEditorsManager.deleteEditor'
						onClick={async () =>
							await actorEditorsManager.deleteEditor(editorState.id)
						}
						className='dark:bg-gray-200 dark:hover:bg-gray-400 rounded-full'
					>
						<XMarkIcon className='h-4 w-4 text-gray-700' />
					</Button>
				</div>
				{editorState.quote.some ? (
					<p className='px-3 dark:text-white text-xs italic '>
						{editorState.quote.val.id}
					</p>
				) : null}
				{editorState.author.some ? (
					<p className='px-3 pb-1 dark:text-white text-xs italic '>
						{editorState.author.val.id}
					</p>
				) : null}
				<form className='flex flex-col mx-3'>
					<textarea
						rows={2}
						placeholder='Quote...'
						value={editorState.quote.some ? editorState.quote.val.text : ''}
						autoComplete='false'
						inputMode='text'
						onChange={handleQuoteChanges}
						data-tooltip-id='tooltip'
						data-tooltip-content='ACTION: ActorQuote.setText'
						data-tooltip-place='top'
						data-tooltip-variant='info'
						className='w-full rounded-2xl p-2 dark:bg-stone-700 dark:text-white mb-2'
						style={{ resize: 'none' }}
					/>
					<div className='flex items-center space-x-2'>
						<input
							disabled={!hasAuthor()}
							placeholder={hasAuthor() ? 'Author fullname...' : 'Anonymous'}
							value={
								editorState.author.some ? editorState.author.val.fullname : ''
							}
							autoComplete='false'
							inputMode='text'
							onChange={handleAuthorChanges}
							data-tooltip-id='tooltip'
							data-tooltip-content='ACTION: ActorAuthor.setFullName'
							data-tooltip-place='top'
							data-tooltip-variant='info'
							className='w-full rounded-2xl p-2 dark:bg-stone-700 dark:text-white'
						/>
						{/* Delete icon button */}
						<Button
							tooltip='ACTION: ActorLibrary.deleteActor'
							disabled={editorState.quote.none}
							onClick={async () => {
								if (editorState.quote.some) {
									await actorLibrary.deleteActor(editorState.quote.val.id)
								}
								await actorEditorsManager.deleteEditor(editorState.id)
							}}
						>
							<TrashIcon className='h-6 w-6 dark:text-white' />
						</Button>
					</div>
				</form>
			</div>
		)

	// Show the minimized editor
	return (
		<Button
			tooltip={`ACTION: ActorEditor.setShowUi - ${tooltipText}`}
			onClick={() => editorState.setShowUi(true)}
			className='dark:bg-gray-200 dark:hover:bg-gray-400 rounded-full'
		>
			<ChevronUpIcon className='h-4 w-4 text-gray-700' />
		</Button>
	)
}
