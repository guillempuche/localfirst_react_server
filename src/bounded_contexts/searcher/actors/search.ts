import { Actor, IResolver } from 'tarant'
import { Err, None, Ok, Option, Result, Some } from 'ts-results'

import { ErrBadRequest, ErrNotFound, Error } from '../../../common_actors'
import { mock_authors, mock_quotes } from '../../../mock'
import { ActorAuthor, ActorQuote, topicActorQuote } from '../../library/actors'
import { simulateLoad } from '../../library/repositories/simulate_load'

// export class ActorSearch extends Actor implements IResolver {
export class ActorSearch extends Actor {
	// #quotes: Option<ActorQuote[]>;
	// #authors: Option<ActorAuthor[]>;

	constructor() {
		super('search')

		// const loadedQuotes = mock_quotes.map(
		// 	(el) =>
		// 		new ActorQuote({
		// 			id: el.id,
		// 			text: el.text,
		// 			authorRef: el.authorRef,
		// 			collectionRef: el.collectionRef,
		// 			createdAt: el.createdAt,
		// 			isDraft: el.isDraft,
		// 			topic: topicActorQuote,
		// 		}),
		// );

		// const loadedAuthors = mock_authors.map(
		// 	(el) =>
		// 		new ActorAuthor({
		// 			id: el.id,
		// 			fullname: el.fullname,
		// 			birthDate: el.birthDate,
		// 			isDraft: el.isDraft,
		// 		}),
		// );
		// this.#quotes = Some(loadedQuotes);
		// this.#authors = Some(loadedAuthors);
	}

	// // Onle used in Tarant system.
	// public async resolveActorById(id: string): Promise<ActorQuote | ActorAuthor> {
	// 	try {
	// 		await simulateLoad();

	// 		// Search in quotes.
	// 		if (this.#quotes.some) {
	// 			const foundQuote = this.#quotes.val.find((quote) => quote.id === id);
	// 			if (foundQuote) {
	// 				return foundQuote;
	// 			}
	// 		}

	// 		// Search in authors if quote is not found.
	// 		if (this.#authors.some) {
	// 			const foundAuthor = this.#authors.val.find(
	// 				(author) => author.id === id,
	// 			);

	// 			if (foundAuthor) {
	// 				return foundAuthor;
	// 			}
	// 		}

	// 		throw new ErrBadRequest();
	// 	} catch (_) {
	// 		throw new ErrBadRequest("Failed to retrieve data");
	// 	}
	// }

	// public async getById(
	// 	id: string,
	// ): Promise<Result<Option<ActorQuote | ActorAuthor>, Error>> {
	// 	try {
	// 		await simulateLoad();

	// 		// Search in quotes.
	// 		if (this.#quotes.some) {
	// 			const foundQuote = this.#quotes.val.find((quote) => quote.id === id);
	// 			if (foundQuote) {
	// 				return Ok(Some(foundQuote));
	// 			}
	// 		}

	// 		// Search in authors if quote is not found.
	// 		if (this.#authors.some) {
	// 			const foundAuthor = this.#authors.val.find(
	// 				(author) => author.id === id,
	// 			);
	// 			if (foundAuthor) {
	// 				return Ok(Some(foundAuthor));
	// 			}
	// 		}

	// 		// If neither a quote nor an author isn't found.
	// 		return Ok(None);
	// 	} catch (error) {
	// 		return Err(new ErrBadRequest("Failed to retrieve data"));
	// 	}
	// }

	// public async searchAuthorsByName(
	// 	name: string,
	// ): Promise<Result<Option<ActorAuthor[]>, Error>> {
	// 	try {
	// 		await simulateLoad();

	// 		if (this.#authors.some) {
	// 			const filteredAuthors = this.#authors.val.filter((author) =>
	// 				author.fullname.toLowerCase().includes(name.toLowerCase()),
	// 			);

	// 			return Ok(Some(filteredAuthors));
	// 		}

	// 		// If the authors aren't found.
	// 		return Ok(None);
	// 	} catch (error) {
	// 		return Err(new ErrNotFound("Failed to search authors by name"));
	// 	}
	// }

	// public async searchQuotesByAuthor(
	// 	authorId: string,
	// ): Promise<Result<Option<ActorQuote[]>, Error>> {
	// 	try {
	// 		await simulateLoad();

	// 		if (this.#quotes.some) {
	// 			const filteredQuotes = this.#quotes.val.filter(
	// 				(quote) => quote.authorRef.some && quote.authorRef.val === authorId,
	// 			);

	// 			return Ok(Some(filteredQuotes));
	// 		}

	// 		return Ok(None);
	// 	} catch (error) {
	// 		return Err(new ErrNotFound("Failed to search quotes by author"));
	// 	}
	// }

	// public async searchQuotesByCollection(
	// 	collectionId: string
	// ): Promise<Result<Option<ActorQuote>, Error>> {
	// 	try {
	// 		await simulateLoad();
	// 		const filteredQuotes = this.#quotes.filter(
	// 			(quote) =>
	// 				quote.collectionRef.some && quote.collectionRef.val === collectionId
	// 		);

	// 		return Ok(filteredQuotes);
	// 	} catch (error) {
	// 		return Err(new ErrNotFound('Failed to search quotes by collection'));
	// 	}
	// }
}
