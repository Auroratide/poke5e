import { DataClass } from "$lib/DataClass"

export class DistanceSet<T extends string> extends DataClass<Partial<Record<T, number>>> {
	mergeWith = (other: this): this => {
		const removedNulls = Object.fromEntries(
			Object.entries(other.data).filter(([, value]) => value != null),
		)

		const combined = {
			...this.data,
			...removedNulls,
		}

		return new (this.constructor as new (data: object) => this)(combined)
	}

	formatString = (type: T): string => `${this.data[type]}ft. ${type}`

	static fromList<T extends string, D extends DistanceSet<T>>(Type: { new(values: Partial<Record<T, number>>): D }, list: { type: T, value: number }[]): D {
		return new Type(list.reduce((obj, cur) => ({
			...obj,
			[cur.type]: cur.value,
		}), {}))
	}
}
