import { Attributes } from "$lib/dnd/attributes"
import { Level } from "$lib/dnd/level"
import { SkillRanks } from "$lib/dnd/skills"
import { PokemonGender } from "$lib/pokemon/gender"
import { Nature } from "$lib/pokemon/nature"
import { Stab } from "$lib/pokemon/stab"
import { createEmptyChosenTrainerPath } from "$lib/trainers/paths"
import type { TrainerInfo, TrainerPokemon } from "$lib/trainers/types"
import { type PokemonSpecies } from "../species"
import { TagList } from "../tags"

export type CuratedEncounter = {
	name: string,
	trainers: {
		info: TrainerInfo,
		pokemon: {
			species: PokemonSpecies,
			info: TrainerPokemon,
		}[],
	}[]
}

const NO_TRAINER: TrainerInfo = {
	name: "Encounter",
	description: "",
	level: new Level(1),
	ac: 10,
	hp: { current: 1, max: 1 },
	hitDice: { current: 1, max: 1 },
	attributes: new Attributes({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }),
	proficiencies: SkillRanks.fromList([]),
	savingThrows: [],
	biography: {
		species: null,
		gender: null,
		age: null,
		homeRegion: null,
		background: null,
	},
	money: 0,
	inventory: [],
	specializations: {
		"bug": 0,
		"dark": 0,
		"dragon": 0,
		"electric": 0,
		"fairy": 0,
		"fighting": 0,
		"fire": 0,
		"flying": 0,
		"ghost": 0,
		"grass": 0,
		"ground": 0,
		"ice": 0,
		"normal": 0,
		"poison": 0,
		"psychic": 0,
		"rock": 0,
		"steel": 0,
		"water": 0,
	},
	path: createEmptyChosenTrainerPath(),
	feats: [],
	tags: TagList.empty(),
}

const defaultPokemon = (species: PokemonSpecies): TrainerPokemon => ({
	id: "",
	trainerId: "",
	pokemonId: species.id,
	nickname: "",
	type: species.type,
	nature: new Nature("Hardy"),
	level: new Level(species.minLevel),
	exp: 0,
	gender: PokemonGender.None,
	attributes: species.attributes.copy(),
	ac: species.ac,
	hp: { current: species.hp, max: species.hp },
	hitDice: { current: species.minLevel, max: species.minLevel },
	abilities: species.abilities.normal.length > 0 ? [species.abilities.normal[0]] : [],
	proficiencies: species.skills.copy(),
	savingThrows: species.saves,
	moves: [],
	items: [],
	notes: "",
	status: null,
	isShiny: false,
	feats: [],
	speeds: species.speed,
	senses: species.senses,
	bond: {
		level: 0,
		points: { current: 0, max: 0 },
	},
	stab: Stab.default(),
	tags: TagList.empty(),
})

class CuratedEncounterBuilder {
	private addedCustomTrainer = false
	private trainers: CuratedEncounter["trainers"] = [ {
		info: { ...NO_TRAINER },
		pokemon: [],
	} ]

	constructor(readonly name: string) {}

	trainer(info: Partial<TrainerInfo>): CuratedEncounterBuilder {
		const allInfo = {
			...NO_TRAINER,
			...info,
		}

		if (this.addedCustomTrainer) {
			this.trainers.push({
				info: allInfo,
				pokemon: [],
			})
		} else {
			this.trainers[0].info = allInfo
		}

		this.addedCustomTrainer = true

		return this
	}

	pokemon(species: PokemonSpecies, info: Partial<TrainerPokemon>): CuratedEncounterBuilder {
		const allInfo = {
			...defaultPokemon(species),
			...info,
		}

		this.trainers[this.trainers.length - 1].pokemon.push({
			species: species,
			info: allInfo,
		})

		return this
	}

	build(): CuratedEncounter {
		return {
			name: this.name,
			trainers: this.trainers,
		}
	}
}

export const CuratedEncounter = {
	start(name: string): CuratedEncounterBuilder {
		return new CuratedEncounterBuilder(name)
	},
}