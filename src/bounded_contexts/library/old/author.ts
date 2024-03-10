import { Actor, type IProtocol, type Topic } from 'tarant'
import { None, type Option, Some } from 'ts-results'
import { v4 as uuid } from 'uuid'

import { LibraryIds } from '.'
import { Error } from '../../../common_actors'

export type ActorAuthorConstructor = {
	topic: Topic<IProtocolActorAuthor>
	id?: string
	fullname?: string
	birthDate?: Date
	isDraft?: boolean
}

export class ActorAuthor extends Actor {
	#topic: Topic<IProtocolActorAuthor>
	#fullname: string
	#birthDate: Option<Date>
	#isDraft: boolean

	constructor({
		topic,
		id = uuid(),
		fullname,
		birthDate,
		isDraft = true,
	}: ActorAuthorConstructor) {
		super(`${LibraryIds.author}/${id}`)
		this.#fullname = fullname ?? ''
		this.#birthDate = !birthDate ? None : Some(birthDate)
		this.#isDraft = isDraft ?? false
		this.#topic = topic
	}
	get fullname(): string {
		return this.#fullname
	}
	get birthDate(): Option<Date> {
		return this.#birthDate
	}
	get isDraft(): boolean {
		return this.#isDraft
	}
	setFullname(value: string) {
		this.#fullname = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
	setBirthDate(value: Option<Date>) {
		this.#birthDate = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
	setIsDraft(value: boolean) {
		this.#isDraft = value
		this.#topic.notify('onUpdate', this)
		console.info('onUpdate')
	}
}

export abstract class IProtocolActorAuthor implements IProtocol {
	/**
	 * Called when there's an update in an ActorAuthor.
	 */
	abstract onUpdate(actorAuthor: ActorAuthor): void
}
