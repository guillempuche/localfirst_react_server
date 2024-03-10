export { v4 as uuid } from 'uuid'

export * from './quote_machine'
export * from './library_machine'

export type IActorCtx = {
	id: string
}

export enum LibraryIds {
	author = 'author',
	collection = 'collection',
	editorsManager = 'editors-manager',
	editor = 'editor',
	quote = 'quote',
}
