export class DataClass<T> {
	constructor(public data: T) {}

	copy(overrides: Partial<T> = {}): this {
		const constructor = this.constructor as new (data: T) => this
		const clone = structuredClone(this.data)
		return new constructor(Object.assign(clone, overrides))
	}
}

export type Data<D extends DataClass<unknown>> = D["data"]
