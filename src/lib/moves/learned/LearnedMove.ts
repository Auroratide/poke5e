import type { Attribute } from "$lib/dnd/attributes"
import type { Resource } from "$lib/poke5e/resource"
import type { MoveDuration } from "../duration"
import type { MoveStats } from "../MoveStats"
import type { MoveRange } from "../range"
import type { MoveTime } from "../time"
import type { MoveType } from "../type"

export type LearnedMove = {
	id: string,
	moveId: string,
	pp: Resource,
	notes?: string,
	modifiers: {
		toHit: number,
		damage: number,
		saveDc: number,
	},
	customization: {
		type?: MoveType,
		powers?: Attribute[],
		time?: MoveTime,
		duration?: MoveDuration,
		range?: MoveRange,
	},
}

export const LearnedMove = {
	create: (move: {
		id: string,
		moveId: string,
		pp: number,
	}): LearnedMove => ({
		id: move.id,
		moveId: move.moveId,
		pp: {
			current: move.pp,
			max: move.pp,
		},
		notes: "",
		modifiers: {
			toHit: 0,
			damage: 0,
			saveDc: 0,
		},
		customization: {},
	}),
	applyToMoveStats: (learnedMove: LearnedMove, stats: MoveStats): MoveStats => {
		if (stats.toHit)
			stats.toHit += learnedMove.modifiers.toHit
		if (stats.save)
			stats.save.dc += learnedMove.modifiers.saveDc
		if (stats.damage)
			stats.damage.mod += learnedMove.modifiers.damage

		return stats
	},
} as const
