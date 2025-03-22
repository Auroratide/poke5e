import type { Move, Tm } from "../types"

export function stubMove(template: Partial<Move>): Move {
	return {
		id: template.id ?? "tackle",
		name: template.name ?? "Tackle",
		type: template.type ?? "normal",
		power: template.power ?? ["str", "dex"],
		time: template.time ?? "1 action",
		pp: template.pp ?? 20,
		duration: template.duration ?? "instantaneous",
		range: template.range ?? "melee",
		description: template.description ?? ["You rush forward and slam into a creature. Make a melee attack roll against a target, doing 1d6 + MOVE normal damage on a hit."],
		higherLevels: template.higherLevels,
		optional: template.optional,
		contest: template.contest,
	}
}

export function stubTm(template: Partial<Tm>): Tm {
	return {
		id: template.id ?? 1,
		move: template.move ?? "work-up",
		cost: template.cost ?? 8000,
		moveInfo: template.moveInfo ?? stubMove({
			id: "work-up",
			name: "Work Up",
		}),
		pokemon: template.pokemon,
	}
}
