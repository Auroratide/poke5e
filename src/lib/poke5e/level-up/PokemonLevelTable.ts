import { AbilityScoreImprovement } from "$lib/dnd/attributes"
import type { Level } from "$lib/dnd/level"
import type { TrainerPokemon } from "$lib/trainers/types"
import { get } from "svelte/store"
import { DndAndPokemonFeats } from "../feats"
import type { PokemonSpecies } from "../species"
import { AsiOrFeatEffect } from "./effects/AsiOrFeat"
import { DamageIncreaseEffect } from "./effects/DamageIncrease"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"
import { NewMovesEffect } from "./effects/NewMoves"
import { StabIncreaseEffect } from "./effects/StabIncrease"
import type { EvolutionForest } from "$lib/pokemon/evolution"
import { PeakPowerEffect } from "./effects/PeakPower"

const standardLevelUpEffects = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
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

const Level01 = () => []
const Level02 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new NewMovesEffect({
		currentLevel: pokemon.level,
		movePool: species.moves,
	}, {}),
]
const Level03 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level04 = (pokemon: TrainerPokemon, species: PokemonSpecies, evolutions: EvolutionForest | undefined) => [
	...standardLevelUpEffects(pokemon, species),
	new AsiOrFeatEffect({
		options: get(DndAndPokemonFeats),
		pointsToSpend: evolutions?.asi(species.id) ?? 2,
		attributes: pokemon.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level05 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
	new DamageIncreaseEffect({
		currentLevel: pokemon.level,
		moves: pokemon.moves,
	}, {}),
]
const Level06 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new NewMovesEffect({
		currentLevel: pokemon.level,
		movePool: species.moves,
	}, {}),
]
const Level07 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level08 = (pokemon: TrainerPokemon, species: PokemonSpecies, evolutions: EvolutionForest | undefined) => [
	...standardLevelUpEffects(pokemon, species),
	new AsiOrFeatEffect({
		options: get(DndAndPokemonFeats),
		pointsToSpend: evolutions?.asi(species.id) ?? 2,
		attributes: pokemon.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level09 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level10 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new NewMovesEffect({
		currentLevel: pokemon.level,
		movePool: species.moves,
	}, {}),
	new DamageIncreaseEffect({
		currentLevel: pokemon.level,
		moves: pokemon.moves,
	}, {}),
]
const Level11 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level12 = (pokemon: TrainerPokemon, species: PokemonSpecies, evolutions: EvolutionForest | undefined) => [
	...standardLevelUpEffects(pokemon, species),
	new AsiOrFeatEffect({
		options: get(DndAndPokemonFeats),
		pointsToSpend: evolutions?.asi(species.id) ?? 2,
		attributes: pokemon.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level13 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level14 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new NewMovesEffect({
		currentLevel: pokemon.level,
		movePool: species.moves,
	}, {}),
]
const Level15 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level16 = (pokemon: TrainerPokemon, species: PokemonSpecies, evolutions: EvolutionForest | undefined) => [
	...standardLevelUpEffects(pokemon, species),
	new AsiOrFeatEffect({
		options: get(DndAndPokemonFeats),
		pointsToSpend: evolutions?.asi(species.id) ?? 2,
		attributes: pokemon.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level17 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new DamageIncreaseEffect({
		currentLevel: pokemon.level,
		moves: pokemon.moves,
	}, {}),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level18 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new NewMovesEffect({
		currentLevel: pokemon.level,
		movePool: species.moves,
	}, {}),
]
const Level19 = (pokemon: TrainerPokemon, species: PokemonSpecies) => [
	...standardLevelUpEffects(pokemon, species),
	new StabIncreaseEffect({
		currentLevel: pokemon.level,
		stab: pokemon.stab,
	}, {}),
]
const Level20 = (pokemon: TrainerPokemon, species: PokemonSpecies, evolutions: EvolutionForest | undefined) => [
	...standardLevelUpEffects(pokemon, species),
	new PeakPowerEffect({
		options: get(DndAndPokemonFeats),
		pointsToSpend: evolutions?.asi(species.id) ?? 2,
		attributes: pokemon.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]


const LEVELS = [
	Level01,
	Level02,
	Level03,
	Level04,
	Level05,
	Level06,
	Level07,
	Level08,
	Level09,
	Level10,
	Level11,
	Level12,
	Level13,
	Level14,
	Level15,
	Level16,
	Level17,
	Level18,
	Level19,
	Level20,
]

export const PokemonLevelTable = {
	toLevel(level: Level) {
		return LEVELS[level.data - 1]
	},
} as const
