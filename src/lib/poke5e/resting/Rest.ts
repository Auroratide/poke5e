import type { DiceRoller } from "$lib/dnd/dice"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { Trainer, TrainerPokemon } from "$lib/trainers/types"
import {
	RestoreAllHp,
	RestoreBondPoints,
	RestoreHitDice,
	RestorePp,
	RestoreStatus,
	SpendHitDice,
	type RestEffect,
} from "./RestEffect"

export class Rest<T> {
	constructor(readonly name: string, readonly effects: RestEffect<T>[]) {}

	apply(creature: T): T {
		return this.effects.reduce((result, effect) => effect.apply(result), creature)
	}
}

export type RestType = "Long" | "Short" | "Pokecenter"

export const PokemonResting = {
	Long: () => new Rest("Long Rest", [ 
		new RestoreAllHp(), 
		new RestoreHitDice(),
		new RestoreStatus(),
		new RestorePp(),
		new RestoreBondPoints(),
	]),
	Short: (options: { hitDiceToSpend: number, hitDiceSize: HitDice, diceRoller?: DiceRoller }) => new Rest("Short Rest", [ 
		new SpendHitDice(options.hitDiceToSpend, options.hitDiceSize, options.diceRoller),
		new RestoreStatus(),
	]),
	Pokecenter: () => new Rest("Pokécenter", [ 
		new RestoreAllHp(), 
		new RestoreStatus(),
	]),
} as const satisfies Record<RestType, (context?: unknown) => Rest<TrainerPokemon>>

export const TrainerResting = {
	Long: () => new Rest("Long Rest", [ 
		new RestoreAllHp(), 
		new RestoreHitDice(),
	]),
	Short: (options: { hitDiceToSpend: number, hitDiceSize: HitDice, diceRoller?: DiceRoller }) => new Rest("Short Rest", [ 
		new SpendHitDice(options.hitDiceToSpend, options.hitDiceSize, options.diceRoller),
	]),
	Pokecenter: () => new Rest("Pokécenter", []),
} as const satisfies Record<RestType, (context?: unknown) => Rest<Trainer>>
