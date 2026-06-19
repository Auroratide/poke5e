import type { Level } from "$lib/dnd/level"
import type { TrainerPokemon } from "$lib/trainers/types"
import type { PokemonSpecies } from "../species"
import { DamageIncreaseEffect } from "./effects/DamageIncrease"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"

// const Level01 = () => []
const Level02 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	new IncreaseLevelEffect({
		currentLevel: pokemon.level,
	}, {}),
	new IncreaseHpEffect({
		hitDice: species.hitDice,
		attributes: pokemon.attributes,
		currentHp: pokemon.hp.max,
	}, {
		increaseAmount: 0,
	}),
	new DamageIncreaseEffect({
		currentLevel: pokemon.level,
		moves: pokemon.moves,
	}, {}),
]

export const PokemonLevelTable = {
	toLevel(level: Level) {
		console.log(level)
		return Level02
	},
} as const
