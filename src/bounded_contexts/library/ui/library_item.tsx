import classNames from 'classnames'
import type React from 'react'
// import { useActor } from 'tarant-react-hook'
import { Some } from 'ts-results'

import { Button } from '@/common_ui'
// import {
// 	ActorAuthor,
// 	ActorQuote,
// 	actorEditorsManager,
// 	actorLibrary,
// } from '../actors'

// type LibraryItemProps = {
// 	quote: ActorQuote
// 	author?: ActorAuthor
// }

interface LibraryItemPropsDefault
	//LibraryItemProps,
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export const LibraryItem: React.FC<LibraryItemPropsDefault> = ({
	// quote,
	// author,
	className,
}) => {
	// const quoteState = useActor(quote)
	// const authorState = useActor(author)

	return (
		<div
			className={classNames(
				'rounded-2xl p-5 space-y-2 bg-green-50 dark:bg-stone-900 hover:bg-green-100 dark:hover:bg-green-900',
				className,
			)}
		>
			{/* <p className='dark:text-white'>{quoteState.text}</p>
			<div className='flex space-x-2'>
				<p className='dark:text-white flex-1'>
					-{' '}
					{authorState !== undefined && authorState?.fullname.length !== 0
						? authorState.fullname
						: 'Anonymous'}
				</p>

				<Button
					tooltip='ACTION: ActorEditorsManager.addEditor'
					onClick={() => actorEditorsManager.addEditor(Some(quoteState))}
				>
					Update
				</Button>
				<Button
					tooltip='ACTION: ActorLibrary.deleteActor'
					onClick={() => actorLibrary.deleteActor(quoteState.id)}
				>
					Delete
				</Button>
			</div>
			<p className='dark:text-white text-xs italic '>{quoteState.id}</p>
			{author?.some ? (
				<p className='dark:text-white text-xs italic '>{author.val.id}</p>
			) : null} */}
		</div>
	)
}
