export class DetailedError extends Error {
	constructor(message: string, readonly details: string, cause?: unknown) {
		super(message, { cause })
	}
}
