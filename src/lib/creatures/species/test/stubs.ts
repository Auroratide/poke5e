import { stubSpeciesMedia } from "$lib/creatures/media/test/stubs"
import { stubMovePool } from "$lib/creatures/move-pool/test/stubs"
import type { Data } from "$lib/DataClass"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
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
		...template,
	})
}