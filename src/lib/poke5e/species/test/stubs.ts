import { stubSpeciesMedia } from "$lib/poke5e/species/media/test/stubs"
import { stubMovePool } from "$lib/pokemon/move-pool/test/stubs"
import type { Data } from "$lib/DataClass"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
import type { PokemonJsonResponse, SinglePokemonJsonResponse } from "../PokemonJsonResponse"
import { PokemonSpecies } from "../PokemonSpecies"

export function stubPokemonSpecies(template: Partial<Data<PokemonSpecies>> = {}): PokemonSpecies {
	return new PokemonSpecies({
		id: "drakeon",
		name: "Drakeon",
		type: ["dragon"],
		number: 0,
		size: "small",
		attributes: stubAttributes().data,
		sr: 8,
		minLevel: 5,
		eggGroups: ["Field"],
		gender: "7:1",
		description: "",
		ac: 17,
		hp: 50,
		hitDice: "d10",
		speed: {
			walking: 40,
			swimming: 0,
			climbing: 0,
			flying: 15,
			hover: 0,
			burrowing: 0,
		},
		senses: {
			darkvision: 0,
			blindsight: 0,
			tremorsense: 0,
			truesight: 0,
		},
		skills: stubSkillProficiencies({
			intimidation: 1,
		}).data,
		saves: ["dex"],
		abilities: {
			normal: ["intimidate"],
			hidden: ["inner-focus"],
		},
		moves: stubMovePool().data,
		media: stubSpeciesMedia().data,
		notes: "",
		...template,
	})
}

export function stubPokemonJsonResponse(...pokemon: SinglePokemonJsonResponse[]): PokemonJsonResponse {
	return {
		items: pokemon,
	}
}

export function stubSinglePokemonJsonResponse(template: Partial<SinglePokemonJsonResponse>): SinglePokemonJsonResponse {
	return {
		id: "drakeon",
		name: "Drakeon",
		type: ["dragon"],
		number: 0,
		size: "small",
		attributes: stubAttributes().data,
		sr: 8,
		minLevel: 5,
		eggGroup: ["Field"],
		gender: "7:1",
		description: "",
		ac: 17,
		hp: 50,
		hitDice: "d10",
		speed: [ {
			type: "walking",
			value: 40,
		} ],
		senses: [],
		skills: ["intimidation"],
		savingThrows: ["dex"],
		abilities: [ {
			id: "intimidate",
			hidden: false,
		}, {
			id: "inner-focus",
			hidden: true,
		} ],
		moves: {
			start: [],
			level2: [],
			level6: [],
			level10: [],
			level14: [],
			level18: [],
			tm: [],
		},
		media: {
			main: "",
		},
		...template,
	}
}