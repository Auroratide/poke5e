import type { PokemonGender } from "$lib/creatures/gender"
import type { Level } from "$lib/dnd/level"
import type { LearnedMove, PokemonBond } from "$lib/trainers/types"
import type { PokeType } from "../types-2"

export interface EvolutionCondition<T> {
	meetsCondition: (creature: T) => boolean
	toString: () => string
}

export const EvolutionCondition = {
	fromType(type: EvolutionConditionType): EvolutionCondition<unknown> {
		switch (type.type) {
		case "level": return new LevelCondition(type.value)
		case "item": return new ItemCondition(type.value)
		case "loyalty": return new BondCondition(type.value)
		case "move": return new MoveCondition(type.value)
		case "move-type": return new MoveTypeCondition(type.value)
		case "gender": return new GenderCondition(type.value as PokemonGender)
		case "time": return new TimeCondition(type.value)
		case "special": return new SpecialCondition(type.value)
		default: return new SpecialCondition("")
		}
	},
}

export type EvolutionConditionType = {
	type: "level",
	value: number,
} | {
	type: "item",
	value: string,
} | {
	type: "loyalty",
	value: number,
} | {
	type: "move",
	value: string,
} | {
	type: "move-type",
	value: PokeType,
} | {
	type: "gender",
	value: "male" | "female",
} | {
	type: "time",
	value: "day" | "night" | "morning" | "afternoon",
} | {
	type: "special",
	value: string,
}
export type TypedEvolutionConditionType<T extends string | number> = {
	type: EvolutionConditionType["type"],
	value: T,
}
export const TimesOfDay = [
	"day",
	"night",
	"morning",
	"afternoon",
] as const

export class LevelCondition<T extends HasLevel> implements EvolutionCondition<T> {
	constructor(readonly targetLevel: number) {}

	meetsCondition(creature: T): boolean {
		return creature.level.data >= this.targetLevel
	}

	toString(): string {
		return `at level ${this.targetLevel} or above`
	}
}

export class ItemCondition implements EvolutionCondition<never> {
	constructor(readonly itemName: string) {}

	meetsCondition(): boolean {
		return true
	}

	toString(): string {
		return `using a ${this.itemName}`
	}
}

export class BondCondition<T extends HasBond> implements EvolutionCondition<T> {
	constructor(readonly targetLevel: number) {}

	meetsCondition(creature: T): boolean {
		return creature.bond.level >= this.targetLevel
	}

	toString(): string {
		return `with a bond of +${this.targetLevel} or higher`
	}
}

export class MoveCondition<T extends HasMoves> implements EvolutionCondition<T> {
	constructor(readonly requiredMove: string) {}

	meetsCondition(creature: T): boolean {
		return creature.moves.some((it) => it.moveId === this.requiredMove)
	}

	toString(): string {
		return `while knowing {{move::${this.requiredMove}}}`
	}
}

export class MoveTypeCondition<T extends HasMoves> implements EvolutionCondition<T> {
	constructor(readonly requiredType: PokeType) {}

	meetsCondition(): boolean {
		return true
	}

	toString(): string {
		return `while knowing a ${this.requiredType}-type move`
	}
}

export class GenderCondition<T extends HasGender> implements EvolutionCondition<T> {
	constructor(readonly gender: PokemonGender) {}

	meetsCondition(creature: T): boolean {
		return creature.gender === this.gender
	}

	toString(): string {
		return `A ${this.gender}`
	}
}

export class TimeCondition implements EvolutionCondition<never> {
	constructor(readonly time: "day" | "night" | "morning" | "afternoon") {}

	meetsCondition(): boolean {
		return true
	}

	toString(): string {
		return `during the ${this.time}`
	}
}

export class SpecialCondition implements EvolutionCondition<never> {
	constructor(readonly condition: string) {}

	meetsCondition(): boolean {
		return true
	}

	toString(): string {
		return this.condition
	}
}

type HasLevel = {
	level: Level,
}

type HasBond = {
	bond: PokemonBond,
}

type HasMoves = {
	moves: LearnedMove[],
}

type HasGender = {
	gender: PokemonGender,
}