import { relativeNumberCompare, type RelativeValue } from "$lib/ui/forms"
import type { Item } from "./Item"

export class ItemFilter {
	private filters: {
		name: string,
		type: string | "",
		cost: undefined | {
			relative: RelativeValue,
			value: number,
		},
	} = {
			name: "",
			type: "",
			cost: undefined,
		}

	count(): number {
		const isFilterInactive = (filter: unknown) => filter == null || (Array.isArray(filter) ? filter.length === 0 : filter === "")
		return Object.values(this.filters).reduce<number>((sum, cur) => sum + (isFilterInactive(cur) ? 0 : 1), 0)
	}

	name(value: string): ItemFilter {
		this.filters.name = value
		return this
	}

	type(value: string | ""): ItemFilter {
		this.filters.type = value
		return this
	}

	cost(relative: RelativeValue, value: number | undefined): ItemFilter {
		this.filters.cost = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	apply = (item: Item): boolean => {
		return item.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
			&& (this.filters.type === "" || item.type === this.filters.type)
			&& (this.filters.cost == null || (relativeNumberCompare(this.filters.cost.relative, item.cost ?? Infinity, this.filters.cost.value)))
	}
}
