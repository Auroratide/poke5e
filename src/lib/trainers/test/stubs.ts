import { PokemonGender } from "$lib/creatures/gender"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Level } from "$lib/dnd/level"
import { Speeds } from "$lib/dnd/movement"
import { Senses } from "$lib/dnd/senses"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
import { PokemonTeraType, PokemonType } from "$lib/pokemon/types-2"
import type { LearnedMove, TrainerPokemon } from "../types"

export function stubLearnedMove(template: Partial<LearnedMove> = {}): LearnedMove {
	return {
		id: "1",
		moveId: "tackle",
		pp: {
			current: 10,
			max: 10,
		},
		notes: "",
		...template,
	}
}

export function stubTrainerPokemon(template: Partial<TrainerPokemon> = {}): TrainerPokemon {
	return {
		id: "1",
		trainerId: "1",
		pokemonId: "eevee",
		nickname: "Softie",
		type: new PokemonType(["normal"]),
		nature: "Lonely",
		level: new Level(4),
		exp: 0,
		gender: PokemonGender.Female,
		attributes: stubAttributes(),
		ac: 13,
		hp: {
			current: 28,
			max: 28,
		},
		hitDice: {
			current: 4,
			max: 4,
		},
		ability: "run-away",
		proficiencies: stubSkillProficiencies(),
		savingThrows: ["dex"],
		moves: [],
		items: [],
		notes: "",
		teraType: new PokemonTeraType("normal"),
		status: null,
		isShiny: false,
		feats: [],
		customSize: undefined,
		customHitDiceSize: undefined,
		speeds: new Speeds({}),
		senses: new Senses({}),
		bond: {
			level: 2,
			points: {
				current: 2,
				max: 2,
			},
		},
		...template,
	}
}