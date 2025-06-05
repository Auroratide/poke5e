import type { Attribute, Attributes } from "../dnd/types"

export type PlayerLike = {
	level: number,
	attributes: Attributes,
}

export type Prerequisite = (player: PlayerLike) => boolean

export const level = (level: number): Prerequisite => (player) => player.level >= level

export const oneOfAttributes = (attributes: Attribute[], amount: number): Prerequisite => (player) => attributes.some((attr) => player.attributes[attr] >= amount)
