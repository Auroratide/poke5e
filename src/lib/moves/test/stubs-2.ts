import type { Data } from "$lib/DataClass"
import type { MoveDice } from "../dice"
import { Move } from "../Move"
import { MoveAttack } from "../MoveAttack"
import { MoveSave } from "../MoveSave"
import type { Tm } from "../tms/Tm"
import { TmDetails } from "../tms/TmDetails"

export function stubMove(template: Partial<Data<Move>> = {}): Move {
	return new Move({
		id: "tackle",
		name: "Tackle",
		type: "normal",
		power: ["str", "dex"],
		time: {
			unit: "action",
		},
		pp: 20,
		duration: {
			unit: "instantaneous",
			concentration: false,
		},
		range: {
			type: "melee",
		},
		description: "You rush forward and slam into a creature. Make a melee attack roll against a target, doing 1d6 + MOVE normal damage on a hit.",
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
		time: {
			unit: "action",
		},
		pp: 20,
		duration: {
			unit: "instantaneous",
			concentration: false,
		},
		range: {
			type: "melee",
		},
		description: "You rush forward and slam into a creature. Make a melee attack roll against a target, doing 1d6 + MOVE normal damage on a hit.",
		tm: stubTmDetails(),
		...template,
	})
}

export function stubMoveDice(template: Partial<MoveDice> = {}): MoveDice {
	return {
		class: "custom",
		tiers: ["1d4", "2d4", "3d4", "4d4"],
		modifier: "MOVE",
		type: "damage",
		...template,
	}
}

export function stubMoveAttack(template: Partial<Data<MoveAttack>> = {}): MoveAttack {
	return new MoveAttack({
		scope: "melee",
		...template,
	})
}

export function stubMoveSave(template: Partial<Data<MoveSave>> = {}): MoveSave {
	return new MoveSave({
		attribute: ["dex"],
		dc: "MOVE",
		...template,
	})
}
