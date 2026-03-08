export class DetailedError extends Error {
	constructor(message: string, readonly details: string) {
		super(message)
	}
}
