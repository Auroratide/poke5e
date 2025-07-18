export class DataClass<T> {
	constructor(public data: T) {}

	copy(): this {
		const constructor = this.constructor as new (data: T) => this
		const clone = structuredClone(this.data)
		return new constructor(clone)
	}
}

export type Data<D extends DataClass<unknown>> = D["data"]
