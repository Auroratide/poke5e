import type { Data } from "$lib/DataClass"
import { Move } from "../Move"
import type { Tm } from "../tms/Tm"
import { TmDetails } from "../tms/TmDetails"

export function stubMove(template: Partial<Data<Move>> = {}): Move {
	return new Move({
		id: "tackle",
		name: "Tackle",
		type: "normal",
		power: ["str", "dex"],
		time: "1 action",
		pp: 20,
		duration: "instantaneous",
		range: "melee",
		description: ["You rush forward and slam into a creature. Make a melee attack roll against a target, doing 1d6 + MOVE normal damage on a hit."],
		...template,
	})
}

export function stubTmDetails(template: Partial<Data<TmDetails>> = {}): TmDetails {
	return new TmDetails({
		id: 1,
		cost: 1000,
		...template,
	})
}

export function stubTm(template: Partial<Data<Move>>): Tm {
	return new Move({
		id: "tackle",
		name: "Tackle",
		type: "normal",
		power: ["str", "dex"],
		time: "1 action",
		pp: 20,
		duration: "instantaneous",
		range: "melee",
		description: ["You rush forward and slam into a creature. Make a melee attack roll against a target, doing 1d6 + MOVE normal damage on a hit."],
		tm: stubTmDetails(),
		...template,
	})
}
