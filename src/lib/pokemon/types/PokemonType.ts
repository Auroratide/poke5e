import { defensiveMultipliers } from "@auroratide/pokemon-types"
import { DataClass } from "$lib/DataClass"
import { alphabetical, equalUnordered } from "$lib/utils/list"
import type { TeraType } from "./PokemonTeraType"
import { m } from "$lib/site/i18n"
import { capitalize } from "$lib/utils/string"

const PokeTypes = [
	"bug",
	"dark",
	"dragon",
	"electric",
	"fairy",
	"fighting",
	"fire",
	"flying",
	"ghost",
	"grass",
	"ground",
	"ice",
	"normal",
	"poison",
	"psychic",
	"rock",
	"steel",
	"water",
] as const

const LOCALIZED_NAMES: Record<TeraType, () => string> = {
	bug: m["canonical.types.bug"],
	dark: m["canonical.types.dark"],
	dragon: m["canonical.types.dragon"],
	electric: m["canonical.types.electric"],
	fairy: m["canonical.types.fairy"],
	fighting: m["canonical.types.fighting"],
	fire: m["canonical.types.fire"],
	flying: m["canonical.types.flying"],
	ghost: m["canonical.types.ghost"],
	grass: m["canonical.types.grass"],
	ground: m["canonical.types.ground"],
	ice: m["canonical.types.ice"],
	normal: m["canonical.types.normal"],
	poison: m["canonical.types.poison"],
	psychic: m["canonical.types.psychic"],
	rock: m["canonical.types.rock"],
	steel: m["canonical.types.steel"],
	water: m["canonical.types.water"],
	stellar: m["canonical.types.stellar"],
}

export type PokeType = typeof PokeTypes[number]

export class PokemonType extends DataClass<PokeType[]> {
	static readonly list = PokeTypes

	static readonly isPokeType = (value: string): value is PokeType =>
		(this.list as readonly string[]).includes(value)

	static readonly name = (type: string): string =>
		type in LOCALIZED_NAMES ? LOCALIZED_NAMES[type]() : capitalize(type)

	get primary(): PokeType { return this.data[0] }
	get secondary(): PokeType | undefined { return this.data[1] }

	toString(): string {
		return this.data.map(PokemonType.name).join("/")
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
