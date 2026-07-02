import type { Resource } from "$lib/poke5e/resource"
import type { Level } from "./level"

export type BaseCharacter = {
	level: Level,
	hp: Resource,
	ac: number,
}
