import {
	Actor,
	type ActorConstructor,
	type IProtocol,
	type ProtocolMethods,
	type Topic,
} from 'tarant'
import { Err, None, Ok, type Option, type Result, Some } from 'ts-results'
import { v4 as uuid } from 'uuid'

import { ErrBadRequest, ErrNotFound, type Error } from '@/common_actors'
import {
	ActorAuthor,
	type ActorCollection,
	ActorQuote,
	type IActorGetId,
	type IProtocolActorAuthor,
	type IProtocolActorQuote,
	LibraryIds,
	actorLibrary,
} from '.'

export interface ActorEditorConstructor extends ActorConstructor {
	topic: Topic<IProtocolActorEditor>
	subcriberTopicActorQuote: Topic<IProtocolActorQuote>
	subcriberTopicActorAuthor: Topic<IProtocolActorAuthor>
	quote?: Option<ActorQuote>
	author?: Option<ActorAuthor>
	collection?: Option<ActorCollection>
	showUi?: boolean
}

export class ActorEditor
	extends Actor
	implements
		IActorGetId,
		ProtocolMethods<IProtocolActorQuote>,
		ProtocolMethods<IProtocolActorAuthor>
{
	#quote: Option<ActorQuote>
	#author: Option<ActorAuthor>
	#collection: Option<ActorCollection>
	#showUi: boolean
	#topic: Topic<IProtocolActorEditor>

	constructor({
		topic,
		subcriberTopicActorQuote,
		subcriberTopicActorAuthor,
		showUi = false,
		quote = None,
		author = None,
		collection = None,
	}: ActorEditorConstructor) {
		super(`${LibraryIds.editor}/${uuid()}`)
		this.#quote = quote
		this.#author = author
		this.#collection = collection
		this.#showUi = showUi
		this.#topic = topic

		// Listen changes in ActorQuote and ActorAuthor via topic channels
		// to update the UI accordingly using React state.
		this.subscribeToTopic(subcriberTopicActorQuote)
		this.subscribeToTopic(subcriberTopicActorAuthor)
	}
	get quote(): Option<ActorQuote> {
		return this.#quote
	}
	get author(): Option<ActorAuthor> {
		return this.#author
	}
	get collection(): Option<ActorCollection> {
		return this.#collection
	}
	get showUi(): boolean {
		return this.#showUi
	}
	setQuote(value: ActorQuote): void {
		this.#quote = Some(value)
	}
	setAuthor(value: ActorAuthor): void {
		this.#author = Some(value)
	}
	setCollection(value: ActorCollection): void {
		this.#collection = Some(value)
	}
	setShowUi(value: boolean) {
		this.#showUi = value
		this.#topic.notify('onShowUiUpdate', this.id, this.#showUi)
		console.info('onShowUiUpdate')
	}
	getById(id: string): Option<Actor> {
		if (this.#quote.some && this.#quote.val.id === id) {
			return this.#quote
		}
		if (this.#author.some && this.#author.val.id === id) {
			return this.#author
		}
		if (this.#collection.some && this.#collection.val.id === id) {
			return this.#collection
		}
		return None
	}
	// Function overloads
	onUpdate(actorQuote: ActorQuote): void
	onUpdate(actorAuthor: ActorAuthor): void
	onUpdate(arg: ActorQuote | ActorAuthor): void {
		if (arg instanceof ActorQuote) {
			this.self?.setQuote(arg)
		} else if (arg instanceof ActorAuthor) {
			this.self?.setAuthor(arg)
		}
	}
	async delete(actorId: string): Promise<Result<None, Error>> {
		const actors = [this.#quote, this.#author, this.#collection]

		// Find the actor with the matching ID.
		const actorToDelete = actors.find(
			actor => actor.some && actor.val.id === actorId,
		)

		// If no actor is found, return an error.
		if (!actorToDelete || actorToDelete.none)
			return Err(new ErrNotFound('Actor not found'))

		try {
			await actorLibrary.deleteActor(actorToDelete.val.id)

			return Ok(None)
		} catch (_) {
			return Err(new ErrBadRequest('Failed to delete actor'))
		}
	}
}

export abstract class IProtocolActorEditor implements IProtocol {
	/**
	 * Called when there's an update in an ActorQuote.
	 */
	abstract onShowUiUpdate(actorId: string, newValue: boolean): void
}
