import type { RulesVersion } from "$lib/design/rules-version"
import type { DiceRoller } from "$lib/dnd/dice"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { TrainerPath } from "$lib/trainers/paths"
import type { Trainer, TrainerPokemon } from "$lib/trainers/types"
import {
	RestoreAllHp,
	RestoreBondPoints,
	RestoreHitDice,
	RestorePathResource,
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
	Pokecenter: (options: { rulesVersion: RulesVersion }) => options.rulesVersion === "2018"
		? new Rest("Pokécenter", [ 
			new RestoreAllHp(),
			new RestoreHitDice(),
			new RestoreStatus(),
			new RestorePp(),
			new RestoreBondPoints(),
		]) : new Rest("Pokécenter", [ 
			new RestoreAllHp(),
			new RestoreStatus(),
		]),
} as const satisfies Record<RestType, (context?: unknown) => Rest<TrainerPokemon>>

export const TrainerResting = {
	Long: (options: { trainerPaths: TrainerPath[] }) => new Rest("Long Rest", [ 
		new RestoreAllHp(), 
		new RestoreHitDice(),
		new RestorePathResource(options.trainerPaths),
	]),
	Short: (options: { hitDiceToSpend: number, hitDiceSize: HitDice, diceRoller?: DiceRoller }) => new Rest("Short Rest", [ 
		new SpendHitDice(options.hitDiceToSpend, options.hitDiceSize, options.diceRoller),
	]),
	Pokecenter: () => new Rest("Pokécenter", []),
} as const satisfies Record<RestType, (context?: unknown) => Rest<Trainer>>
