import { HitDice } from "$lib/dnd/hit-dice"
import type { Level } from "$lib/dnd/level"
import type { Trainer, TrainerPokemon } from "$lib/trainers/types"
import type { PokemonSpecies } from "../species"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"
import { NewTrainerPathEffect } from "./effects/NewTrainerPath"

const Level01 = () => []
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
]

export const PokemonLevelTable = {
	toLevel(level: Level) {
		return Level02
	},
} as const
