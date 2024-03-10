import {
	Actor,
	type ActorConstructor,
	type ProtocolMethods,
	type Topic,
} from 'tarant'
import { Err, None, Ok, type Option, type Result, Some } from 'ts-results'

import {
	ErrClientOperation,
	ErrNotFound,
	type Error,
	actorSystem,
} from '@/common_actors'
import {
	ActorAuthor,
	ActorEditor,
	ActorQuote,
	type IProtocolActorEditor,
	type IProtocolActorQuote,
	type IProtocolNewContent,
	LibraryIds,
	topicActorAuthor,
	topicActorEditor,
	topicActorQuote,
} from '.'
import { simulateLoad } from '../repositories/simulate_load'

export interface ActorEditorsManagerConstructor extends ActorConstructor {
	subscriberTopicActorQuote: Topic<IProtocolActorQuote>
	subscriberTopicActorEditor: Topic<IProtocolActorEditor>
	newestUpdate?: Option<string>
	topicOnNewContent: Topic<IProtocolNewContent>
}

// Used as a frontend state.
export class ActorEditorsManager
	extends Actor
	implements
		ProtocolMethods<IProtocolActorQuote>,
		ProtocolMethods<IProtocolActorEditor>
{
	#topicOnNewContent: Topic<IProtocolNewContent>
	#editors: Option<ActorEditor[]>
	#newestUpdate: Option<string>

	constructor({
		topicOnNewContent,
		subscriberTopicActorQuote,
		subscriberTopicActorEditor,
		newestUpdate = None,
	}: ActorEditorsManagerConstructor) {
		super(LibraryIds.editorsManager)
		this.#editors = None
		this.#newestUpdate = newestUpdate
		this.#topicOnNewContent = topicOnNewContent

		// Listen changes in ActorQuote and ActorEditor via topic channels.
		// to update the UI accordingly using React state.
		this.subscribeToTopic(subscriberTopicActorQuote)
		this.subscribeToTopic(subscriberTopicActorEditor)
	}
	get editors(): Option<ActorEditor[]> {
		return this.#editors
	}
	get newestUpdate(): Option<string> {
		return this.#newestUpdate
	}
	setEditors(value: Option<ActorEditor[]>) {
		this.#editors = value
	}
	setNewestUpdate(value: Option<string>): void {
		this.#newestUpdate = value
	}
	getEditorById(id: string): Option<ActorEditor> {
		if (this.#editors.some) {
			const editorId = this.#editors.val.find(el => el.id === id)

			if (typeof editorId === 'string') return Some(editorId)
		}

		return None
	}
	onUpdate(quote: ActorQuote): void {
		if (this.#editors.some) {
			const foundEditor = this.#editors.val.find(
				editor => editor.quote.some && editor.quote.val.id === quote.id,
			)

			if (foundEditor) {
				this.self?.setNewestUpdate(Some(foundEditor.id))
			}
		}
	}
	onShowUiUpdate(editorId: string, value: boolean): void {
		// Only hide the rest of editors if the updated editor is visible.
		if (value && this.#editors.some) {
			for (const editor of this.#editors.val) {
				if (editor.id !== editorId) {
					editor.self?.setShowUi(false)
				}
			}
		}
	}
	/**
	 * (a) Add a new editor if there's no other one with the same input quote, else
	 * we're creating a new quote (input is empty), then (b) use an empy editor or
	 * (c) create a new one.
	 */
	async addEditor(inputQuote: Option<ActorQuote>): Promise<void> {
		let editorFound = false

		await simulateLoad()

		if (this.#editors.some) {
			for (const editor of this.#editors.val) {
				const { quote } = editor

				// The editor already has the input quote, let's show the editor
				if (
					inputQuote.some &&
					quote.some &&
					quote.val.id === inputQuote.val.id
				) {
					editor.setShowUi(true)
					editorFound = true
					continue
				}
				// An empty editor matches empty input content
				if (inputQuote.none && quote.none) {
					editorFound = true
					editor.setShowUi(true)
					continue
				}
				// If this editor doesn't match, let's minimize it
				editor.setShowUi(false)
			}
		}

		// Skip if we already found the editor
		if (!editorFound) {
			// If no editor was found, create a new one and also quote and author in
			// Actor System.
			try {
				const author = await (inputQuote.some && inputQuote.val.authorRef.some
					? actorSystem.actorFor<ActorAuthor>(inputQuote.val.authorRef.val)
					: actorSystem.actorOf(ActorAuthor, {
							topic: topicActorAuthor,
					  }))
				const quote = inputQuote.some
					? inputQuote.val
					: actorSystem.actorOf(ActorQuote, {
							topic: topicActorQuote,
							authorRef: author.id,
					  })

				// Notify only if we created an new quote
				if (inputQuote.none) {
					this.#topicOnNewContent.notify('onNewQuote', quote)
					console.info('onNewQuote')
				}
				this.#topicOnNewContent.notify('onNewAuthor', author)
				console.info('onNewAuthor')

				const newEditor = actorSystem.actorOf(ActorEditor, {
					topic: topicActorEditor,
					subcriberTopicActorQuote: topicActorQuote,
					subcriberTopicActorAuthor: topicActorAuthor,
					quote: Some(quote),
					author: Some(author),
					showUi: true,
				})

				// Add the new editor to the editors list
				if (this.#editors.some) {
					this.self?.setEditors(Some([...this.#editors.val, newEditor]))
					return
				}

				this.self?.setEditors(Some([newEditor]))
			} catch (err) {
				console.warn(err)
			}
		}
	}
	async deleteEditor(editorId: string): Promise<Result<void, Error>> {
		try {
			await simulateLoad()

			if (this.#editors.some) {
				const index = this.#editors.val.findIndex(el => el.id === editorId)

				if (index === -1) {
					return Err(new ErrNotFound('Editor not found'))
				}

				const updatedEditors = [...this.#editors.val]
				updatedEditors.splice(index, 1)
				this.self?.setEditors(Some(updatedEditors))

				return Ok(undefined)
			}

			return Err(new ErrNotFound('No editors available'))
		} catch (error) {
			return Err(new ErrClientOperation("Editor couldn't be removed"))
		}
	}
}
