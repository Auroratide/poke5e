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
	value: Attribute[],
} | {
	type: "proficiency",
	value: Skill[],
} | {
	type: "other",
	value: string,
}

export const SpecializationList = {
	PokeFan: {
		id: "poke-fan",
		name: "Poké Fan",
		effect: [ {
			type: "asi",
			value: ["cha"],
		} ],
		type: "normal",
	},
	BlackBelt: {
		id: "black-belt",
		name: "Black Belt",
		effect: [ {
			type: "proficiency",
			value: ["athletics"],
		} ],
		type: "fighting",
	},
	BirdKeeper: {
		id: "bird-keeper",
		name: "Bird Keeper",
		effect: [ {
			type: "proficiency",
			value: ["perception"],
		} ],
		type: "flying",
	},
	Punk: {
		id: "punk",
		name: "Punk",
		effect: [ {
			type: "proficiency",
			value: ["sleight of hand"],
		} ],
		type: "poison",
	},
	Camper: {
		id: "camper",
		name: "Camper",
		effect: [ {
			type: "proficiency",
			value: ["survival"],
		} ],
		type: "ground",
	},
	Hiker: {
		id: "hiker",
		name: "Hiker",
		effect: [ {
			type: "asi",
			value: ["con"],
		} ],
		type: "rock",
	},
	BugManiac: {
		id: "bug-maniac",
		name: "Bug Maniac",
		effect: [ {
			type: "proficiency",
			value: ["nature"],
		} ],
		type: "bug",
	},
	Mystic: {
		id: "mystic",
		name: "Mystic",
		effect: [ {
			type: "proficiency",
			value: ["religion"],
		} ],
		type: "ghost",
	},
	Worker: {
		id: "worker",
		name: "Worker",
		effect: [ {
			type: "asi",
			value: ["str"],
		} ],
		type: "steel",
	},
	Kindler: {
		id: "kindler",
		name: "Kindler",
		effect: [ {
			type: "proficiency",
			value: ["intimidation"],
		} ],
		type: "fire",
	},
	Swimmer: {
		id: "swimmer",
		name: "Swimmer",
		effect: [ {
			type: "asi",
			value: ["dex"],
		} ],
		type: "water",
	},
	Gardener: {
		id: "gardener",
		name: "Gardener",
		effect: [ {
			type: "proficiency",
			value: ["medicine"],
		} ],
		type: "grass",
	},
	Engineer: {
		id: "engineer",
		name: "Engineer",
		effect: [ {
			type: "asi",
			value: ["int"],
		} ],
		type: "electric",
	},
	Psychic: {
		id: "psychic",
		name: "Psychic",
		effect: [ {
			type: "proficiency",
			value: ["arcana"],
		} ],
		type: "psychic",
	},
	Skier: {
		id: "skier",
		name: "Skier",
		effect: [ {
			type: "proficiency",
			value: ["acrobatics"],
		} ],
		type: "ice",
	},
	DragonTamer: {
		id: "dragon-tamer",
		name: "Dragon Tamer",
		effect: [ {
			type: "asi",
			value: ["wis"],
		} ],
		type: "dragon",
	},
	Delinquent: {
		id: "delinquent",
		name: "Delinquent",
		effect: [ {
			type: "proficiency",
			value: ["stealth"],
		} ],
		type: "dark",
	},
	Actor: {
		id: "actor",
		name: "Actor",
		effect: [ {
			type: "proficiency",
			value: ["performance"],
		} ],
		type: "fairy",
	},
} satisfies Record<string, Specialization>

export const SpecializationList2018 = {
	TeamPlayer: {
		id: "team-player",
		name: "Team Player",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con", "int", "wis", "cha"],
		} ],
		type: "normal",
	},
	MartialArtist: {
		id: "martial-artist",
		name: "Martial Artist",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con"],
		} ],
		type: "fighting",
	},
	BirdKeeper: {
		id: "bird-keeper",
		name: "Bird Keeper",
		effect: [ {
			type: "proficiency",
			value: ["perception"],
		} ],
		type: "flying",
	},
	Alchemist: {
		id: "alchemist",
		name: "Alchemist",
		effect: [ {
			type: "proficiency",
			value: ["medicine", "deception"],
		} ],
		type: "poison",
	},
	Camper: {
		id: "camper",
		name: "Camper",
		effect: [ {
			type: "proficiency",
			value: ["survival"],
		} ],
		type: "ground",
	},
	Mountaineer: {
		id: "mountaineer",
		name: "Mountaineer",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con"],
		} ],
		type: "rock",
	},
	BugManiac: {
		id: "bug-maniac",
		name: "Bug Maniac",
		effect: [ {
			type: "proficiency",
			value: ["nature"],
		} ],
		type: "bug",
	},
	Mystic: {
		id: "mystic",
		name: "Mystic",
		effect: [ {
			type: "proficiency",
			value: ["arcana"],
		} ],
		type: "ghost",
	},
	SteelWorker: {
		id: "steel-worker",
		name: "Steel Worker",
		effect: [ {
			type: "asi",
			value: ["str", "con"],
		} ],
		type: "steel",
	},
	Pyromaniac: {
		id: "pyromaniac",
		name: "Pyromaniac",
		effect: [ {
			type: "asi",
			value: ["con"],
		} ],
		type: "fire",
	},
	Swimmer: {
		id: "swimmer",
		name: "Swimmer",
		effect: [ {
			type: "other",
			value: "You gain a swim speed equal to your movement speed.",
		} ],
		type: "water",
	},
	Gardener: {
		id: "gardener",
		name: "Gardener",
		effect: [ {
			type: "proficiency",
			value: ["nature"],
		} ],
		type: "grass",
	},
	Engineer: {
		id: "engineer",
		name: "Engineer",
		effect: [ {
			type: "asi",
			value: ["int"],
		} ],
		type: "electric",
	},
	Psychic: {
		id: "psychic",
		name: "Psychic",
		effect: [ {
			type: "other",
			value: "You gain the ability to target one of your Pokémon with the Telepathy spell once per day, ignoring components.",
		} ],
		type: "psychic",
	},
	IceSkater: {
		id: "ice-skater",
		name: "Ice Skater",
		effect: [ {
			type: "proficiency",
			value: ["performance", "persuasion"],
		} ],
		type: "ice",
	},
	DragonTamer: {
		id: "dragon-tamer",
		name: "Dragon Tamer",
		effect: [ {
			type: "asi",
			value: ["wis"],
		} ],
		type: "dragon",
	},
	Shadow: {
		id: "shadow",
		name: "Shadow",
		effect: [ {
			type: "proficiency",
			value: ["deception", "stealth"],
		} ],
		type: "dark",
	},
	Charmer: {
		id: "charmer",
		name: "Charmer",
		effect: [ {
			type: "asi",
			value: ["cha"],
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
			description.push(`Increase your ${new Intl.ListFormat("en", { type: "disjunction" }).format(it.value.map((word) => word.toLocaleUpperCase()))} by 1, to a maximum of 20.`)
			break
		case "proficiency":
			description.push(`You gain proficiency in ${new Intl.ListFormat("en", { type: "disjunction" }).format(it.value.map(capitalize))}, or if you already had proficiency, you gain expertise.`)
			break
		case "other":
			description.push(it.value)
			break
		}
	})

	description.push(`Add a +1 bonus to all skill checks made by any of your ${capitalize(specialization.type)}-type Pokémon.`)

	return description.join(" ")
}

function findByType(type: PokeType): Specialization {
	return Object.values(SpecializationList).find((it) => it.type === type)
}

export function typeRanksToMap(types: Record<PokeType, number>): Map<Specialization, number> {
	return new Map<Specialization, number>(Object.entries(types).map(([type, rank]) =>
		[findByType(type as PokeType), rank]
	))
}

export function mapToTypeRanks(specializations: Map<Specialization, number>): Record<PokeType, number> {
	return specializations.entries().reduce((obj, cur) => ({
		...obj,
		[cur[0].type]: cur[1],
	}), {} as Record<PokeType, number>)
}
