import type { Attribute } from "./types"

export const attributeList: {
    abbr: Attribute,
    name: string,
}[] = [ {
	abbr: "str",
	name: "strength",
}, {
	abbr: "dex",
	name: "dexterity",
}, {
	abbr: "con",
	name: "constitution",
}, {
	abbr: "int",
	name: "intelligence",
}, {
	abbr: "wis",
	name: "wisdom",
}, {
	abbr: "cha",
	name: "charisma",
} ]

export const modifierForScore = (score: number): number => Math.floor(score / 2) - 5
