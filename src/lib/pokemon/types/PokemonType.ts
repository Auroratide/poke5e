import { defensiveMultipliers } from "@auroratide/pokemon-types"
import { DataClass } from "$lib/DataClass"
import { alphabetical, equalUnordered } from "$lib/utils/list"
import { capitalize } from "$lib/utils/string"

const PokeTypes = [
	"normal",
	"fighting",
	"flying",
	"poison",
	"ground",
	"rock",
	"bug",
	"ghost",
	"steel",
	"fire",
	"water",
	"grass",
	"electric",
	"psychic",
	"ice",
	"dragon",
	"dark",
	"fairy",
] as const

export type PokeType = typeof PokeTypes[number]

export class PokemonType extends DataClass<PokeType[]> {
	static readonly list = PokeTypes

	static readonly isPokeType = (value: string): value is PokeType =>
		(this.list as readonly string[]).includes(value)

	get primary(): PokeType { return this.data[0] }
	get secondary(): PokeType | undefined { return this.data[1] }

	toString(): string {
		return this.data.map(capitalize).join("/")
	}

	includes(...type: PokeType[]): boolean {
		return type.some((type) => this.data.includes(type))
	}

	vulnerabilities = (): PokeType[] =>
		Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier > 1)
			.map(([type]) => type as PokeType)
			.sort(alphabetical)
	
	resistances = (): PokeType[] => 
		Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => 0 < multiplier && multiplier < 1)
			.map(([type]) => type as PokeType)
			.sort(alphabetical)
	
	immunities = (): PokeType[] =>
		Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier === 0)
			.map(([type]) => type as PokeType)
			.sort(alphabetical)
	
	normalDamange = (): PokeType[] =>
		Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier === 1)
			.map(([type]) => type as PokeType)
			.sort(alphabetical)
	
	equivalent = (other: PokemonType): boolean =>
		equalUnordered(this.data)(other.data)
}
