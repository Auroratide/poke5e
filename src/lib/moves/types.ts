import type { PokeType } from "../pokemon/types"
import type { Attribute } from "../dnd/types"
import type { BodyText } from "../rendering/types"

export type Power = Attribute[] | "none" | "any" | "varies"

export type Contest = {
	contest: string,
	appeal: number,
	jam: number,
	effect: string,
}

export type Move = {
	id: string,
	name: string,
	type: PokeType,
	power: Power,
	time: string,
	pp: number,
	duration: string,
	range: string,
	description: BodyText,
	higherLevels?: string,
	optional?: BodyText,
	contest?: Contest,
	pokemon?: {
		id: string,
		name: string,
	}[],
}

export type MinimalMoveInfo = Pick<Move, "id" | "name" | "type" | "power" | "pp">

export type Tm = {
	id: number,
	move: string,
	cost: number,
	moveInfo: MinimalMoveInfo & Partial<Move>,
	/**
	 * @deprecated use move.pokemon instead
	 */
	pokemon?: {
		id: string,
		name: string,
	}[],
}
