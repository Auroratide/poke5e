import { defensiveMultipliers } from "@auroratide/pokemon-types"
import { DataClass } from "$lib/DataClass"
import { equalUnordered } from "$lib/list"

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

	vulnerabilities = (): Set<PokeType> =>
		new Set(Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier > 1)
			.map(([type]) => type as PokeType),
		)
	
	resistances = (): Set<PokeType> => 
		new Set(Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => 0 < multiplier && multiplier < 1)
			.map(([type]) => type as PokeType),
		)
	
	immunities = (): Set<PokeType> =>
		new Set(Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier === 0)
			.map(([type]) => type as PokeType),
		)
	
	normalDamange = (): Set<PokeType> =>
		new Set(Object.entries(defensiveMultipliers(this.data))
			.filter(([, multiplier]) => multiplier === 1)
			.map(([type]) => type as PokeType),
		)
	
	equivalent = (other: PokemonType): boolean =>
		equalUnordered(this.data)(other.data)
}
