import {
	usePowerSync,
	usePowerSyncWatchedQuery,
} from '@journeyapps/powersync-react'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { Button } from '@components'
import { mock_quotes } from '@mock'
import { db } from './db'

const queryAllQuotes = 'SELECT * FROM quotes'

export const App = () => {
	const powersync = usePowerSync()
	const querySqlAllQuotes = usePowerSyncWatchedQuery(queryAllQuotes)
	const [quotes, setQuotes] = useState<any[]>([])

	useEffect(() => {
		async function fetchQuotes() {
			try {
				console.log('Fetching quotes...')
				const quotesDirect = await db.selectFrom('quotes').selectAll().execute()
				const quotes = await powersync.getAll(queryAllQuotes)
				// queryQuotes.map(quote => console.log(JSON.stringify(quote)))
				console.log(`QuotesDirect Kysely ${quotesDirect}`)
				console.log('Quotes powersync')
				quotes.map(quote => console.log(JSON.stringify(quote)))
				setQuotes(quotes)
			} catch (error) {
				console.error('Error fetching quotes:', error)
			}
		}
		fetchQuotes()
	}, [powersync])

	// useEffect(() => {
	// 	console.log(`PowerSync quotes ${querySqlAllQuotes.toString()}`)
	// }, [querySqlAllQuotes])
	// }

	return (
		<>
			<div className='flex-1 overflow-x-hidden rounded-xl space-y-4'>
				{/* {renderQuotes()} */}
			</div>
			<div className='flex flex-col items-end space-y-1 pb-3'>
				{/* {renderEditors()} */}
			</div>
			{/* Floating button */}
			<Button
				tooltip='ACTION: ActorEditorsManager.addEditor'
				// onClick={() => actorEditorsManager.addEditor(None)}
				className='fixed top-0 right-0 m-4'
			>
				Add Quote
			</Button>
			<Tooltip id='tooltip' />
		</>
	)
}
