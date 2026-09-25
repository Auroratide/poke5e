import { PokemonTeraType, PokemonType, StellarType, type TeraType } from "$lib/pokemon/types"
import { m } from "$lib/site/i18n"

export const TypeVaries = "varies"

export const Typeless = "typeless"

export type MoveType = TeraType | typeof TypeVaries | typeof Typeless

export const MoveType = {
	isMoveType: (type: string): type is MoveType =>
		PokemonTeraType.isTeraType(type) || type === TypeVaries || type === Typeless,
	options: () => (PokemonType.options() as { value: MoveType, name: string }[]).concat([ {
		value: StellarType,
		name: PokemonTeraType.stellarName(),
	}, {
		value: TypeVaries,
		name: m.varies(),
	} ]),
} as const
