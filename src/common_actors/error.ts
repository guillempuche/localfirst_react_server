/**
 * Abstract error to be implemented on all kind of errors.
 */
export interface Error {
	readonly log?: string
}

export interface ErrorData<T> extends Error {
	readonly data?: T
}

export class ErrBadRequest implements Error {
	readonly log?: string

	constructor(log?: string) {
		this.log = log
	}
}

export class ErrClientOperation implements Error {
	readonly log?: string

	constructor(log?: string) {
		this.log = log
	}
}

export class ErrNotFound implements Error {
	readonly log?: string

	constructor(log?: string) {
		this.log = log
	}
}
export class ErrAlreadyExist implements Error {
	readonly log?: string

	constructor(log?: string) {
		this.log = log
	}
}
