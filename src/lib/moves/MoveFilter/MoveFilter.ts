import type { Attribute } from "$lib/dnd/attributes"
import type { PokeType } from "$lib/pokemon/types-2"
import type { Move } from "../types"

export class MoveFilter {
	private filters: {
		name: string,
		type: PokeType | "",
		power: Attribute | "",
		not: string[],
	} = {
			name: "",
			type: "",
			power: "",
			not: [],
		}

	name(value: string): MoveFilter {
		this.filters.name = value
		return this
	}

	type(value: PokeType | ""): MoveFilter {
		this.filters.type = value
		return this
	}

	power(value: Attribute | ""): MoveFilter {
		this.filters.power = value
		return this
	}

	not(ids: string[]): MoveFilter {
		this.filters.not = ids
		return this
	}

	apply = (move: Move): boolean => {
		return move.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
			&& (this.filters.type === "" || move.type === this.filters.type)
			&& (this.filters.power === "" || move.power.includes(this.filters.power))
			&& !this.filters.not.includes(move.id)
	}
}
