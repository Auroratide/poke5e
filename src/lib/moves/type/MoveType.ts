import type { TeraType } from "$lib/pokemon/types"

export const TypeVaries = "varies"

export const Typeless = "typeless"

export type MoveType = TeraType | typeof TypeVaries | typeof Typeless
