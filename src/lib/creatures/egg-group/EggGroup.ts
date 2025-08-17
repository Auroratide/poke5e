import { DataClass } from "$lib/DataClass"

const STANDARD_LIST = [
	"monster",
	"human-like",
	"water 1",
	"water 2",
	"water 3",
	"bug",
	"mineral",
	"flying",
	"amorphous",
	"fairy",
	"ditto",
	"dragon",
	"field",
	"grass",
	"gender unknown",
	"undiscovered",
] as const

export class EggGroup extends DataClass<string[]> {
	static readonly standardList = STANDARD_LIST

	isExclusive = (): boolean => this.data.length === 1

	map = <Ret>(callback: (value: string) => Ret) => {
		return this.data.map(callback)
	}

	toString = () => this.data.join(", ")

	static groupBy<T extends { eggGroup: EggGroup }>(items: T[]): Map<string, GroupedByEggGroup<T>> {
		const result = new Map<string, GroupedByEggGroup<T>>()

		for (const item of items) {
			item.eggGroup.map((group) => {
				if (!result.has(group)) result.set(group, { exclusive: [], shares: [] })
				
				if (item.eggGroup.isExclusive()) {
					result.get(group).exclusive.push(item)
				} else {
					result.get(group).shares.push(item)
				}
			})
		}

		return result
	}
}

export type GroupedByEggGroup<T> = {
	exclusive: T[],
	shares: T[],
}

export type StandardEggGroup = typeof STANDARD_LIST[number]
