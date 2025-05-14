import type { PokeType } from "$lib/pokemon/types";
import type { Specialization } from "../specializations";

export const SpecializationList: Record<PokeType, Specialization> = {
	normal: {
		id: "team-player",
		name: "Team Player",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con", "int", "wis", "cha"],
		} ],
		type: "normal",
	},
	fighting: {
		id: "martial-artist",
		name: "Martial Artist",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con"],
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
		id: "alchemist",
		name: "Alchemist",
		effect: [ {
			type: "proficiency",
			value: ["medicine", "deception"],
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
		id: "mountaineer",
		name: "Mountaineer",
		effect: [ {
			type: "asi",
			value: ["str", "dex", "con"],
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
			value: ["arcana"],
		} ],
		type: "ghost",
	},
	steel: {
		id: "steel-worker",
		name: "Steel Worker",
		effect: [ {
			type: "asi",
			value: ["str", "con"],
		} ],
		type: "steel",
	},
	fire: {
		id: "pyromaniac",
		name: "Pyromaniac",
		effect: [ {
			type: "asi",
			value: ["con"],
		} ],
		type: "fire",
	},
	water: {
		id: "swimmer",
		name: "Swimmer",
		effect: [ {
			type: "other",
			value: "You gain a swim speed equal to your movement speed.",
		} ],
		type: "water",
	},
	grass: {
		id: "gardener",
		name: "Gardener",
		effect: [ {
			type: "proficiency",
			value: ["nature"],
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
			type: "other",
			value: "You gain the ability to target one of your Pokémon with the Telepathy spell once per day, ignoring components.",
		} ],
		type: "psychic",
	},
	ice: {
		id: "ice-skater",
		name: "Ice Skater",
		effect: [ {
			type: "proficiency",
			value: ["performance", "persuasion"],
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
		id: "shadow",
		name: "Shadow",
		effect: [ {
			type: "proficiency",
			value: ["deception", "stealth"],
		} ],
		type: "dark",
	},
	fairy: {
		id: "charmer",
		name: "Charmer",
		effect: [ {
			type: "asi",
			value: ["cha"],
		} ],
		type: "fairy",
	},
}
