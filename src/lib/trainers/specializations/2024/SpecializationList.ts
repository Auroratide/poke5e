import type { PokeType } from "$lib/pokemon/types-2"
import type { Specialization } from "../specializations"

export const SpecializationList: Record<PokeType, Specialization> = {
	normal: {
		id: "poke-fan",
		name: "Poké Fan",
		effect: [ {
			type: "asi",
			value: ["cha"],
		} ],
		type: "normal",
	},
	fighting: {
		id: "black-belt",
		name: "Black Belt",
		effect: [ {
			type: "proficiency",
			value: ["athletics"],
		} ],
		type: "fighting",
	},
	flying: {
		id: "bird-keeper",
		name: "Bird Keeper",
		effect: [ {
			type: "proficiency",
			value: ["perception"],
		} ],
		type: "flying",
	},
	poison: {
		id: "punk",
		name: "Punk",
		effect: [ {
			type: "proficiency",
			value: ["sleight of hand"],
		} ],
		type: "poison",
	},
	ground: {
		id: "camper",
		name: "Camper",
		effect: [ {
			type: "proficiency",
			value: ["survival"],
		} ],
		type: "ground",
	},
	rock: {
		id: "hiker",
		name: "Hiker",
		effect: [ {
			type: "asi",
			value: ["con"],
		} ],
		type: "rock",
	},
	bug: {
		id: "bug-maniac",
		name: "Bug Maniac",
		effect: [ {
			type: "proficiency",
			value: ["nature"],
		} ],
		type: "bug",
	},
	ghost: {
		id: "mystic",
		name: "Mystic",
		effect: [ {
			type: "proficiency",
			value: ["religion"],
		} ],
		type: "ghost",
	},
	steel: {
		id: "worker",
		name: "Worker",
		effect: [ {
			type: "asi",
			value: ["str"],
		} ],
		type: "steel",
	},
	fire: {
		id: "kindler",
		name: "Kindler",
		effect: [ {
			type: "proficiency",
			value: ["intimidation"],
		} ],
		type: "fire",
	},
	water: {
		id: "swimmer",
		name: "Swimmer",
		effect: [ {
			type: "asi",
			value: ["dex"],
		} ],
		type: "water",
	},
	grass: {
		id: "gardener",
		name: "Gardener",
		effect: [ {
			type: "proficiency",
			value: ["medicine"],
		} ],
		type: "grass",
	},
	electric: {
		id: "engineer",
		name: "Engineer",
		effect: [ {
			type: "asi",
			value: ["int"],
		} ],
		type: "electric",
	},
	psychic: {
		id: "psychic",
		name: "Psychic",
		effect: [ {
			type: "proficiency",
			value: ["arcana"],
		} ],
		type: "psychic",
	},
	ice: {
		id: "skier",
		name: "Skier",
		effect: [ {
			type: "proficiency",
			value: ["acrobatics"],
		} ],
		type: "ice",
	},
	dragon: {
		id: "dragon-tamer",
		name: "Dragon Tamer",
		effect: [ {
			type: "asi",
			value: ["wis"],
		} ],
		type: "dragon",
	},
	dark: {
		id: "delinquent",
		name: "Delinquent",
		effect: [ {
			type: "proficiency",
			value: ["stealth"],
		} ],
		type: "dark",
	},
	fairy: {
		id: "actor",
		name: "Actor",
		effect: [ {
			type: "proficiency",
			value: ["performance"],
		} ],
		type: "fairy",
	},
}