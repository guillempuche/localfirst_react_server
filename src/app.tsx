import {
	usePowerSync,
	usePowerSyncWatchedQuery,
} from '@journeyapps/powersync-react'
import { createBrowserInspector } from '@statelyai/inspect'
import { useMachine } from '@xstate/react'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { Button } from '@common-ui'
import { Editor, LibraryItem } from '@library/ui'
import { fypStateMachine } from '@library/ui/home_machine'
import { mock_quotes } from '@mock'
import { db } from './db'

const inspector = createBrowserInspector({
	autoStart: false,
})

const queryAllQuotes = 'SELECT * FROM quotes'

export const App = () => {
	const [state, send] = useMachine(fypStateMachine, {
		inspect: inspector.inspect,
	})
	const powersync = usePowerSync()
	const querySqlAllQuotes = usePowerSyncWatchedQuery(queryAllQuotes)
	const [quotes, setQuotes] = useState<any[]>([])

	useEffect(() => {
		async function fetchQuotes() {
			try {
				console.log('Fetching quotes...')
				// const quotes = await db.selectFrom('quotes').selectAll().execute()
				const quotes = await powersync.getAll(queryAllQuotes)
				// queryQuotes.map(quote => console.log(JSON.stringify(quote)))
				console.log('Kysely quotes')
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

	const content = () => {
		switch (true) {
			case state.matches('idle'):
				return 'Idle'
			case state.matches('loading'):
				return 'Loading... ⏳'
			case state.matches('ok'):
				return state.context.quotes.map(quote => quote.text)
			case state.matches('error'):
				// if (state.context.error.some) return state.context.error.toString()
				return null
			default:
				return 'Problems... 🧑‍🔧'
		}
	}

	return (
		<>
			<div className='flex-1 overflow-x-hidden rounded-xl space-y-4'>
				{content()}
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
