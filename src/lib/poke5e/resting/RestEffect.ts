import type { NonVolatileStatus } from "$lib/pokemon/status"
import type { LearnedMove, PokemonBond, Resource } from "$lib/trainers/types"

export interface RestEffect<T> {
	description: (creature: T) => string
	isApplicable: (creature: T) => boolean
	apply: (creature: T) => T
}

export class RestoreAllHp<T extends HasHp> implements RestEffect<T> {
	description(creature: T) {
		return `<strong>HP</strong>: ${creature.hp.current} → ${creature.hp.max}`
	}

	isApplicable(creature: T) {
		return creature.hp.current < creature.hp.max
	}

	apply(creature: T): T {
		creature.hp.current = creature.hp.max
		return creature
	}
}

export class RestoreHitDice<T extends HasHitDice> implements RestEffect<T> {
	description(creature: T) {
		return `<strong>Hit Dice</strong>: ${creature.hitDice.current} → ${creature.hitDice.max}`
	}

	isApplicable(creature: T) {
		return creature.hitDice.current < creature.hitDice.max
	}

	apply(creature: T): T {
		creature.hitDice.current = creature.hitDice.max
		return creature
	}
}

export class RestoreStatus<T extends HasStatus> implements RestEffect<T> {
	description(creature: T) {
		return `<strong>Status</strong>: ${creature.status ?? "None"} → None`
	}

	isApplicable(creature: T) {
		return creature.status != null
	}

	apply(creature: T): T {
		creature.status = null
		return creature
	}
}

export class RestoreSomeHp<T extends HasHp> implements RestEffect<T> {
	description(creature: T) {
		return `<strong>HP</strong>: ${creature.hp.current} → TODO`
	}

	isApplicable() {
		return false
	}

	apply(creature: T): T {
		// TODO
		return creature
	}
}

export class SpendHitDice<T extends HasHitDice> implements RestEffect<T> {
	constructor(private readonly amount: number) {}

	description(creature: T) {
		return `<strong>Hit Dice</strong>: ${creature.hitDice.current} → ${Math.max(0, creature.hitDice.current - this.amount)}`
	}

	isApplicable() {
		return true
	}

	apply(creature: T): T {
		creature.hitDice.current -= this.amount
		return creature
	}
}

export class RestorePp<T extends HasMoves> implements RestEffect<T> {
	description() {
		return "<strong>Move PP</strong>: Restored to max"
	}

	isApplicable() {
		return true
	}

	apply(creature: T): T {
		creature.moves.forEach((it) => {
			it.pp.current = it.pp.max
		})

		return creature
	}
}

export class RestoreBondPoints<T extends HasBond> implements RestEffect<T> {
	description(creature: T) {
		return `<strong>Bond Points</strong>: ${creature.bond.points.current} → ${creature.bond.points.max}`
	}

	isApplicable(creature: T) {
		return creature.bond.points.current < creature.bond.points.max
	}

	apply(creature: T): T {
		creature.bond.points.current = creature.bond.points.max
		return creature
	}
}

type HasHp = { hp: Resource }
type HasHitDice = { hitDice: Resource }
type HasStatus = { status: NonVolatileStatus }
type HasMoves = { moves: LearnedMove[] }
type HasBond = { bond: PokemonBond }
