import { RandomDiceRoller, type DiceRoller } from "$lib/dnd/dice"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { NonVolatileStatus } from "$lib/pokemon/status"
import type { TrainerPath } from "$lib/trainers/paths"
import type { LearnedMove, PokemonBond, TrainerInfo } from "$lib/trainers/types"
import type { Resource } from "$lib/poke5e/resource"

export interface RestEffect<T> {
	description: (creature: T) => string[]
	isApplicable: (creature: T) => boolean
	apply: (creature: T) => T
}

export class RestoreAllHp<T extends HasHp> implements RestEffect<T> {
	description(creature: T) {
		return [`<strong>HP</strong>: ${creature.hp.current} → ${creature.hp.max}`]
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
		return [`<strong>Hit Dice</strong>: ${creature.hitDice.current} → ${creature.hitDice.max}`]
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
		return [`<strong>Status</strong>: ${creature.status ?? "None"} → None`]
	}

	isApplicable(creature: T) {
		return creature.status != null
	}

	apply(creature: T): T {
		creature.status = null
		return creature
	}
}

export class SpendHitDice<T extends HasHitDice & HasHp> implements RestEffect<T> {
	constructor(
		private readonly amount: number,
		private readonly hitDice: HitDice,
		private readonly diceRoller: DiceRoller = RandomDiceRoller.instance,
	) {}

	description(creature: T) {
		const maxHpPerDie = this.hitDice.sizeAsInt()
		const mightExceed = creature.hp.current + (this.amount - 1) * maxHpPerDie > creature.hp.max

		return [
			`<strong>HP</strong>: ${creature.hp.current} → +${this.amount}${this.hitDice.data}`,
			`<strong>Hit Dice</strong>: ${creature.hitDice.current} → ${Math.max(0, creature.hitDice.current - this.amount)}${mightExceed ? " (or higher)" : ""}`,
		]
	}

	isApplicable(creature: T) {
		return creature.hp.current < creature.hp.max
	}

	apply(creature: T): T {
		const sides = this.hitDice.sizeAsInt()
		for (let i = 0; i < this.amount && creature.hp.current < creature.hp.max && creature.hitDice.current > 0; ++i) {
			creature.hp.current = Math.min(creature.hp.max, creature.hp.current + this.diceRoller.roll(sides))
			creature.hitDice.current -= 1
		}

		return creature
	}
}

export class RestorePp<T extends HasMoves> implements RestEffect<T> {
	description() {
		return ["<strong>Move PP</strong>: Restored to max"]
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
		return [`<strong>Bond Points</strong>: ${creature.bond.points.current} → ${creature.bond.points.max}`]
	}

	isApplicable(creature: T) {
		return creature.bond.points.current < creature.bond.points.max
	}

	apply(creature: T): T {
		creature.bond.points.current = creature.bond.points.max
		return creature
	}
}

export class RestorePathResource<T extends TrainerInfo> implements RestEffect<T> {
	constructor(private readonly possiblePaths: TrainerPath[]) {}

	description(creature: T) {
		const resource = this.myResource(creature)

		if (resource != null) {
			const max = resource.max(creature)
			const newValue = creature.path.resource > max ? creature.path.resource : max

			return [`<strong>${resource.name}</strong>: ${creature.path.resource} → ${newValue}`]
		} else {
			return []
		}
	}

	isApplicable(creature: T) {
		const resource = this.myResource(creature)

		return resource != null && creature.path.resource < resource.max(creature)
	}

	apply(creature: T): T {
		const resource = this.myResource(creature)
		if (resource != null) {
			const max = resource.max(creature)
			creature.path.resource = creature.path.resource > max ? creature.path.resource : max
		}

		return creature
	}

	private myResource(creature: T): TrainerPath["resource"] | undefined {
		return this.possiblePaths.find((it) => it.name === creature.path.name)?.resource
	}
}

type HasHp = { hp: Resource }
type HasHitDice = { hitDice: Resource }
type HasStatus = { status: NonVolatileStatus }
type HasMoves = { moves: LearnedMove[] }
type HasBond = { bond: PokemonBond }
