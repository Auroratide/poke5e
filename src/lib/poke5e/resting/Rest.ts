import type { TrainerPokemon } from "$lib/trainers/types"
import {
	RestoreAllHp,
	RestoreBondPoints,
	RestoreHitDice,
	RestorePp,
	RestoreSomeHp,
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

export const PokemonResting = {
	Long: () => new Rest("Long Rest", [ 
		new RestoreAllHp(), 
		new RestoreHitDice(),
		new RestoreStatus(),
		new RestorePp(),
		new RestoreBondPoints(),
	]),
	Short: ({ hitDiceToSpend }: { hitDiceToSpend: number }) => new Rest("Short Rest", [ 
		new RestoreSomeHp(),
		new SpendHitDice(hitDiceToSpend),
		new RestoreStatus(),
	]),
	Pokecenter: () => new Rest("Pokécenter", [ 
		new RestoreAllHp(), 
		new RestoreStatus(),
	]),
} as const satisfies Record<string, (context?: unknown) => Rest<TrainerPokemon>>
