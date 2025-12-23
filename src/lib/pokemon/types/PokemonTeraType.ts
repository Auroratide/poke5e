import { DataClass } from "$lib/DataClass"
import { PokemonType, type PokeType } from "./PokemonType"

export const StellarType = "stellar"

export type TeraType = PokeType | typeof StellarType

export class PokemonTeraType extends DataClass<TeraType> {
	static readonly list: TeraType[] = [].concat(PokemonType.list).concat(StellarType)

	static readonly isTeraType = (value: string): value is PokeType =>
		(PokemonTeraType.list as readonly string[]).includes(value)
}
