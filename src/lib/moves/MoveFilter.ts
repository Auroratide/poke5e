import type { Attribute } from "$lib/dnd/attributes"
import { relativeNumberCompare, type RelativeValue } from "$lib/ui/forms"
import type { Move } from "./Move"
import { MoveRange } from "./MoveRange"
import { MoveTime } from "./MoveTime"

export class MoveFilter {
	private filters: {
		name: string,
		type: string | "",
		power: Attribute | "",
		tm: number | undefined,
		not: string[],
		time: string | "",
		range: undefined | {
			relative: RelativeValue,
			value: number,
		},
		pp: undefined | {
			relative: RelativeValue,
			value: number,
		},
		cost: undefined | {
			relative: RelativeValue,
			value: number,
		},
		contest: string | "",
	} = {
			name: "",
			type: "",
			power: "",
			not: [],
			tm: undefined,
			time: "",
			range: undefined,
			pp: undefined,
			cost: undefined,
			contest: "",
		}

	count(): number {
		const isFilterInactive = (filter: unknown) => filter == null || (Array.isArray(filter) ? filter.length === 0 : filter === "")
		return Object.values(this.filters).reduce<number>((sum, cur) => sum + (isFilterInactive(cur) ? 0 : 1), 0)
	}

	name(value: string): MoveFilter {
		this.filters.name = value
		return this
	}

	type(value: string | ""): MoveFilter {
		this.filters.type = value
		return this
	}

	power(value: Attribute | ""): MoveFilter {
		this.filters.power = value
		return this
	}

	tm(value: number | undefined): MoveFilter {
		this.filters.tm = value
		return this
	}

	not(ids: string[]): MoveFilter {
		this.filters.not = ids
		return this
	}

	time(value: string): MoveFilter {
		this.filters.time = value
		return this
	}

	rangeInFeet(relative: RelativeValue, value: number | undefined): MoveFilter {
		this.filters.range = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	pp(relative: RelativeValue, value: number | undefined): MoveFilter {
		this.filters.pp = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	cost(relative: RelativeValue, value: number | undefined): MoveFilter {
		this.filters.cost = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	contest(value: string): MoveFilter {
		this.filters.contest = value
		return this
	}

	apply = (move: Move): boolean => {
		return move.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
			&& (this.filters.type === "" || move.type === this.filters.type)
			&& (this.filters.power === "" || move.power.appliesToAttribute(this.filters.power))
			&& (this.filters.tm == null || move.tm?.id.toString().startsWith(this.filters.tm.toString()))
			&& !this.filters.not.includes(move.id)
			&& (this.filters.time === "" || (
				this.filters.time === "other" ? (!MoveTime.options().some((it) => MoveTime.equals(it.value, move.time))) : MoveTime.equals(this.filters.time, move.time)
			))
			&& (this.filters.range == null || relativeNumberCompare(this.filters.range.relative, MoveRange.asNumberOfFeet(move.range), this.filters.range.value))
			&& (this.filters.pp == null || relativeNumberCompare(this.filters.pp.relative, move.pp, this.filters.pp.value))
			&& (this.filters.contest === "" || this.filters.contest === move.contest?.contest)
			&& (this.filters.cost == null || (move.tm != null && relativeNumberCompare(this.filters.cost.relative, move.tm.cost, this.filters.cost.value)))
	}
}
