import { None, type Option, Some } from 'ts-results'
import { assign, setup, spawnChild } from 'xstate'

import type { Error } from '@/common_actors'
import type { IAcAuthor, IAcQuote } from '../actors/index_machine'
import { getRecommendationLogic } from '../actors/library_machine'

type OutputResult = {
	ok: boolean
	err: boolean
}

export const fypStateMachine = setup({
	types: {
		context: {} as {
			readonly quotes: IAcQuote[]
			readonly authors: IAcAuthor[]
			readonly errors: Option<Error[]>
		},
		events: {} as { type: 'fyp.FETCH' },
		output: {} as OutputResult,
	},
	actors: {
		'library.getRecommendations': getRecommendationLogic,
	},
	guards: {
		isResultOk: ({ event }) => {
			return event.output.ok
		},
		// isResultOk: ({ event }) => {
		// 	return (event as EventResult).ok
		// },
		isResultErr: ({ event }) => {
			return event.output.err
		},
	},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiCAe0LPwDc6BrMEtLPQ08qggKtM6AC64GAbQAMAXVlzEoAA51YuCQ2UgAHogDMAFgCcJABwBGAEymA7NYCsdx+YMAaEAE9EVkgetrE0tzW0dLADYIkwiAX1jPbhwCYjJKGnpGYXZOJN5UgTAhFjpRLXxFKUslJBA1DXKdfQRjMytbEwdnVw9vREs7AxJnGQNLAzs7EJDHR3iEkHw6CDgdPJSiHXrNSXwmxABaCM8fBAPHEhMr65ubg3jEjGS+NKot9R3tWuajaxPEExDcLGVy-IyDTrmB4gdYvCh0dAQAhQd4NXb7BCWX4kLGdAwyCKOGQDOwxf6YkzmCw2QGWAaOK7mOzQ2Gpdioz57b6ISaWYZjQJGCJWNzmEzkywyawkOzEtzWAyUhwRUYsp75UhgABOWroWo5jW5CF5-JstmFIQMYolJiMl1MgVJTgmdji8yAA */
	id: 'fyp',
	context: {
		quotes: [],
		authors: [],
		errors: None,
	},
	initial: 'idle',
	states: {
		idle: {
			always: {
				target: 'loading',
			},
		},
		loading: {
			invoke: {
				src: 'library.getRecommendations',
				onDone: [
					{
						target: 'ok',
						guard: 'isResultOk',
						actions: assign({
							quotes: ({ event }) => {
								return event.output.unwrap().quotes
							},
							authors: ({ event }) => {
								return event.output.unwrap().authors
							},
							errors: None,
						}),
					},
					{
						target: 'error',
						guard: 'isResultErr',
						actions: assign({
							errors: ({ event }) => {
								return Some([event.output.val as Error])
							},
						}),
					},
				],
			},
		},
		ok: {},
		error: {},
	},
})
