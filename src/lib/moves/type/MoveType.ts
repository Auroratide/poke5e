import { PokemonTeraType, type TeraType } from "$lib/pokemon/types"

export const TypeVaries = "varies"

export const Typeless = "typeless"

export type MoveType = TeraType | typeof TypeVaries | typeof Typeless

export const MoveType = {
	isMoveType: (type: string): type is MoveType =>
		PokemonTeraType.isTeraType(type) || type === TypeVaries || type === Typeless,
} as const
