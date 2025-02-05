import type { Attribute, Skill } from "$lib/dnd/types"
import type { PokeType } from "$lib/pokemon/types"

export type Specialization = {
	id: string,
	name: string,
	effect: SpecializationEffect[],
	type: PokeType,
}

export type SpecializationEffect = {
	type: "asi",
	value: Attribute,
} | {
	type: "proficiency",
	value: Skill,
}

export const SpecializationList = {
	PokeFan: {
		id: "poke-fan",
		name: "Poké Fan",
		effect: [ {
			type: "asi",
			value: "cha",
		} ],
		type: "normal",
	},
	BlackBelt: {
		id: "black-belt",
		name: "Black Belt",
		effect: [ {
			type: "proficiency",
			value: "athletics",
		} ],
		type: "fighting",
	},
	BirdKeeper: {
		id: "bird-keeper",
		name: "Bird Keeper",
		effect: [ {
			type: "proficiency",
			value: "perception",
		} ],
		type: "flying",
	},
	Punk: {
		id: "punk",
		name: "Punk",
		effect: [ {
			type: "proficiency",
			value: "sleight of hand",
		} ],
		type: "poison",
	},
	Camper: {
		id: "camper",
		name: "Camper",
		effect: [ {
			type: "proficiency",
			value: "survival",
		} ],
		type: "ground",
	},
	Hiker: {
		id: "hiker",
		name: "Hiker",
		effect: [ {
			type: "asi",
			value: "con",
		} ],
		type: "rock",
	},
	BugManiac: {
		id: "bug-maniac",
		name: "Bug Maniac",
		effect: [ {
			type: "proficiency",
			value: "nature",
		} ],
		type: "bug",
	},
	Mystic: {
		id: "mystic",
		name: "Mystic",
		effect: [ {
			type: "proficiency",
			value: "religion",
		} ],
		type: "ghost",
	},
	Worker: {
		id: "worker",
		name: "Worker",
		effect: [ {
			type: "asi",
			value: "str",
		} ],
		type: "steel",
	},
	Kindler: {
		id: "kindler",
		name: "Kindler",
		effect: [ {
			type: "proficiency",
			value: "intimidation",
		} ],
		type: "fire",
	},
	Swimmer: {
		id: "swimmer",
		name: "Swimmer",
		effect: [ {
			type: "asi",
			value: "dex",
		} ],
		type: "water",
	},
	Gardener: {
		id: "gardener",
		name: "Gardener",
		effect: [ {
			type: "proficiency",
			value: "medicine",
		} ],
		type: "grass",
	},
	Engineer: {
		id: "engineer",
		name: "Engineer",
		effect: [ {
			type: "asi",
			value: "int",
		} ],
		type: "electric",
	},
	Psychic: {
		id: "psychic",
		name: "Psychic",
		effect: [ {
			type: "proficiency",
			value: "arcana",
		} ],
		type: "psychic",
	},
	Skier: {
		id: "skier",
		name: "Skier",
		effect: [ {
			type: "proficiency",
			value: "acrobatics",
		} ],
		type: "ice",
	},
	DragonTamer: {
		id: "dragon-tamer",
		name: "Dragon Tamer",
		effect: [ {
			type: "asi",
			value: "wis",
		} ],
		type: "dragon",
	},
	Delinquent: {
		id: "delinquent",
		name: "Delinquent",
		effect: [ {
			type: "proficiency",
			value: "stealth",
		} ],
		type: "dark",
	},
	Actor: {
		id: "actor",
		name: "Actor",
		effect: [ {
			type: "proficiency",
			value: "performance",
		} ],
		type: "fairy",
	},
} satisfies Record<string, Specialization>

function capitalize(word: string): string {
	return word.charAt(0).toLocaleUpperCase() + word.slice(1)
}

export function specializationDescription(specialization: Specialization): string {
	const description = []

	specialization.effect.forEach((it) => {
		switch (it.type) {
		case "asi":
			description.push(`Increase your ${it.value.toLocaleUpperCase()} by 1, to a maximum of 20.`)
			break
		case "proficiency":
			description.push(`You gain proficiency in ${capitalize(it.value)}, or if you already had proficiency, you gain expertise.`)
			break
		}
	})

	description.push(`Add a +1 bonus to all skill checks made by any of your ${capitalize(specialization.type)}-type Pokémon.`)

	return description.join(" ")
}
