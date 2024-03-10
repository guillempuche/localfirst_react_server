import { None, type Option } from 'ts-results'
import { setup } from 'xstate'

import { type IActorCtx, uuid } from './index_machine'

export interface IAcQuote extends IActorCtx {
	text: string
	authorRef: Option<string>
	collectionRef: Option<string>
	isDraft: boolean
	createdAt: Date
}

// ===================
// Context
interface IAcQuoteCtx {
	readonly id: string
	readonly text: string
	readonly authorRef: Option<string>
	readonly collectionRef: Option<string>
	readonly isDraft: boolean
	readonly createdAt: Date
}

// ===================
// Inputs
interface IAcQuoteInput extends IAcQuote {}

// const AcQuoteCtxInitial: IAcQuoteCtx = {
// 	id:
// 	text: '',
// 	authorRef: None,
// 	collectionRef: None,
// 	isDraft: true,
// 	createdAt: new Date(),
// }

// ===================
// Actor's methods (aka events in XState)

// interface AcQuoteEventGetRecommendations {
// 	readonly type: 'AcQuote.getRecommendations'
// }
// type AcQuoteEvents = AcQuoteEventGetRecommendations

export const acQuoteStateMachine = setup({
	types: {
		context: {} as IAcQuoteCtx,
		input: {} as IAcQuoteInput,
	},
}).createMachine({
	context: ({
		input: {
			id = uuid(),
			text,
			authorRef = None,
			collectionRef = None,
			isDraft = true,
			createdAt = new Date(),
		},
	}) => ({
		id,
		text,
		authorRef,
		collectionRef,
		isDraft,
		createdAt,
	}),
})
