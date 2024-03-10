import { Actor } from 'tarant'
import { None, type Option, Some } from 'ts-results'

import { LibraryIds } from '.'
import { Error } from '../../../common_actors'

export type ActorCollectionConstructor = {
	id?: string
	name?: string
	parentRef?: string
}

export type ICollectionParams = {
	name: string
}

// TODO: it's a little incomplete
export class ActorCollection extends Actor {
	#name: Option<string>
	#parentRef: Option<string>

	constructor({ id, name, parentRef }: ActorCollectionConstructor) {
		super(`${LibraryIds.collection}/${id}`)
		this.#name = !name ? None : Some(name)
		this.#parentRef = !parentRef ? None : Some(parentRef)
	}
	get name(): Option<string> {
		return this.#name
	}
	get parentRef(): Option<string> {
		return this.#parentRef
	}
}
