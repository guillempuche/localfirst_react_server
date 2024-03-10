import {
	Actor,
	type ActorConstructor,
	type IProtocol,
	type ProtocolMethods,
	type Topic,
} from 'tarant'
import { Err, None, Ok, type Option, type Result, Some } from 'ts-results'

import {
	ErrBadRequest,
	ErrNotFound,
	type Error,
	actorSystem,
} from '@/common_actors'
import { mock_authors, mock_quotes } from '@/mock'
import {
	ActorAuthor,
	ActorQuote,
	type IProtocolActorAuthor,
	type IProtocolActorQuote,
	topicActorAuthor,
	topicActorQuote,
} from '.'
import { simulateLoad } from '../repositories/simulate_load'

export interface ActorLibraryConstructor extends ActorConstructor {
	subscriberTopicNewContent: Topic<IProtocolNewContent>
	subscriberTopicActorQuote: Topic<IProtocolActorQuote>
	subscriberTopicActorAuthor: Topic<IProtocolActorAuthor>
}

// Used as a frontend state.
export class ActorLibrary
	extends Actor
	implements
		ProtocolMethods<IProtocolNewContent>,
		ProtocolMethods<IProtocolActorQuote>,
		ProtocolMethods<IProtocolActorAuthor>
{
	#quotes: Option<ActorQuote[]>
	#authors: Option<ActorAuthor[]>

	constructor({
		subscriberTopicNewContent,
		subscriberTopicActorQuote,
		subscriberTopicActorAuthor,
	}: ActorLibraryConstructor) {
		super('library')
		this.subscribeToTopic(subscriberTopicNewContent)
		this.subscribeToTopic(subscriberTopicActorQuote)
		this.subscribeToTopic(subscriberTopicActorAuthor)
		this.#quotes = None
		this.#authors = None
	}

	get quotes(): Option<ActorQuote[]> {
		return this.#quotes
	}
	get authors(): Option<ActorAuthor[]> {
		return this.#authors
	}
	setQuotes(value: Option<ActorQuote[]>) {
		this.#quotes = value
	}
	setAuthors(value: Option<ActorAuthor[]>) {
		this.#authors = value
	}
	// Add the new quote to the local list
	onNewQuote(actor: ActorQuote): void {
		// If there are already other quotes
		if (this.#quotes.some) {
			this.self?.setQuotes(Some([...this.#quotes.val, actor]))
			return
		}

		this.self?.setQuotes(Some([actor]))
	}
	// Add the new author to the local list
	onNewAuthor(actor: ActorAuthor): void {
		// If there are already other authors
		if (this.#authors.some) {
			this.self?.setAuthors(Some([...this.#authors.val, actor]))
			return
		}

		// If there are no authors yet
		this.self?.setAuthors(Some([actor]))
	}
	// Function overloads
	onUpdate(actorQuote: ActorQuote): void
	onUpdate(actorAuthor: ActorAuthor): void
	onUpdate(actor: ActorQuote | ActorAuthor): void {
		if (actor instanceof ActorQuote) {
			// Replace the corresponding quote
			if (this.#quotes.some) {
				const updatedQuotes = this.#quotes.val.map(quote =>
					quote.id === actor.id ? actor : quote,
				)
				this.self?.setQuotes(Some(updatedQuotes))
			}
			return
		}
		if (actor instanceof ActorAuthor) {
			// Replace the corresponding author
			if (this.#authors.some) {
				const updatedAuthors = this.#authors.val.map(author =>
					author.id === actor.id ? actor : author,
				)
				this.self?.setAuthors(Some(updatedAuthors))
			}
		}
	}
	/**
	 * It loads all the actor quotes and authors to the Tarant system and make a copy
	 * to ActorLibrary.
	 */
	async getRecommendations(): Promise<Result<void, Error>> {
		try {
			if (this.quotes.none || this.authors.none) {
				const loadedQuotes: ActorQuote[] = []
				const loadedAuthors: ActorAuthor[] = []
				await simulateLoad()

				// Load the quotes and authors in Tarant (actor system)
				for (const mock of mock_quotes) {
					const newActor = actorSystem.actorOf(ActorQuote, {
						topic: topicActorQuote,
						id: mock.id,
						text: mock.text,
						authorRef: mock.authorRef,
						collectionRef: mock.collectionRef,
						createdAt: mock.createdAt,
						isDraft: mock.isDraft,
					})
					loadedQuotes.push(newActor)
				}
				for (const mock of mock_authors) {
					const newActor = actorSystem.actorOf(ActorAuthor, {
						topic: topicActorAuthor,
						id: mock.id,
						fullname: mock.fullname,
						birthDate: mock.birthDate,
						isDraft: mock.isDraft,
					})
					loadedAuthors.push(newActor)
				}

				// Save copy in ActorLibrary
				this.self?.setQuotes(Some(loadedQuotes))
				this.self?.setAuthors(Some(loadedAuthors))
			}
			return Ok(undefined)
		} catch (error) {
			return Err(new ErrBadRequest('Failed to load recommendations'))
		}
	}
	// /**
	//  * Get a local actor by its ID.
	//  */
	// getById<T extends ActorQuote | ActorAuthor>(actorId: string): Option<T> {
	// 	// Check in quotes
	// 	if (this.#quotes.some) {
	// 		const foundQuote = this.#quotes.val.find((quote) => quote.id === actorId);
	// 		if (foundQuote) return Some(foundQuote as T);
	// 	}

	// 	// Check in authors
	// 	if (this.#authors.some) {
	// 		const foundAuthor = this.#authors.val.find(
	// 			(author) => author.id === actorId,
	// 		);
	// 		if (foundAuthor) return Some(foundAuthor as T);
	// 	}

	// 	return None;
	// }
	async deleteActor(actorId: string): Promise<Result<void, Error>> {
		try {
			await simulateLoad()

			// First look for quotes.
			if (this.#quotes.some) {
				const index = this.#quotes.val.findIndex(quote => quote.id === actorId)
				if (index !== -1) {
					const updatedQuotes = [...this.#quotes.val]
					updatedQuotes.splice(index, 1)
					this.self?.setQuotes(Some(updatedQuotes))
					return Ok(undefined)
				}
			}

			// Then, look for authors.
			if (this.#authors.some) {
				const index = this.#authors.val.findIndex(
					author => author.id === actorId,
				)
				if (index !== -1) {
					const updatedAuthors = [...this.#authors.val]
					updatedAuthors.splice(index, 1)
					this.self?.setAuthors(Some(updatedAuthors))
					return Ok(undefined)
				}
			}

			return Err(new ErrNotFound('Actor not found'))
		} catch (error) {
			return Err(new ErrBadRequest('Failed to delete actor'))
		}
	}
}

/**
 * Use this only when it creates a new actor via Actor System
 */
export abstract class IProtocolNewContent implements IProtocol {
	/**
	 * Called when there's a new ActorQuote.
	 */
	abstract onNewQuote(actor: ActorQuote): void
	/**
	 * Called when there's a new ActorAuthoe.
	 */
	abstract onNewAuthor(actor: ActorAuthor): void
}
