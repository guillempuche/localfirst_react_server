import { Actor, type IProtocol, type Topic } from 'tarant'
import { None, type Option, Some } from 'ts-results'
import { v4 as uuid } from 'uuid'

import { LibraryIds } from '.'
import { Error } from '../../../common_actors'

export type ActorQuoteConstructor = {
	topic: Topic<IProtocolActorQuote>
	id?: string
	text?: string
	authorRef?: string
	collectionRef?: string
	createdAt?: Date
	isDraft?: boolean
}

export class ActorQuote extends Actor {
	#text: string
	#authorRef: Option<string>
	#collectionRef: Option<string>
	#isDraft: boolean
	readonly #createdAt: Date
	#topic: Topic<IProtocolActorQuote>

	constructor({
		topic,
		id = uuid(),
		text = '',
		authorRef,
		collectionRef,
		isDraft = true,
		createdAt = new Date(),
	}: ActorQuoteConstructor) {
		super(`${LibraryIds.quote}/${id}`)
		this.#text = text
		this.#authorRef = !authorRef ? None : Some(authorRef)
		this.#collectionRef = !collectionRef ? None : Some(collectionRef)
		this.#isDraft = isDraft
		this.#createdAt = createdAt
		this.#topic = topic
	}
	get text(): string {
		return this.#text
	}
	get authorRef(): Option<string> {
		return this.#authorRef
	}
	get collectionRef(): Option<string> {
		return this.#collectionRef
	}
	get isDraft(): boolean {
		return this.#isDraft
	}
	get createdAt(): Date {
		return this.#createdAt
	}
	setText(value: string) {
		this.#text = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
	setAuthorRef(value: Option<string>) {
		this.#authorRef = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
	setCollectionRef(value: Option<string>) {
		this.#collectionRef = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
	setIsDraft(value: boolean) {
		this.#isDraft = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
}

export abstract class IProtocolActorQuote implements IProtocol {
	/**
	 * Called when there's an update in an ActorQuote.
	 */
	abstract onUpdate(actorQuote: ActorQuote): void
}
