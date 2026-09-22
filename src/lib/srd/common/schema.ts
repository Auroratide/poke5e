import * as z from "zod"

export const PokeType = z.literal([
	"bug",
	"dark",
	"dragon",
	"electric",
	"fairy",
	"fighting",
	"fire",
	"flying",
	"ghost",
	"grass",
	"ground",
	"ice",
	"normal",
	"poison",
	"psychic",
	"rock",
	"steel",
	"water",
]).meta({
	id: "PokeType",
	title: "Pokemon Type",
})

export const CreatureSize = z.literal([
	"tiny",
	"small",
	"medium",
	"large",
	"huge",
	"gargantuan",
]).meta({
	id: "CreatureSize",
	title: "Creature Size",
})

export const HitDiceSize = z.literal([
	"d4",
	"d6",
	"d8",
	"d10",
	"d12",
	"d20",
]).meta({
	id: "HitDiceSize",
	title: "Hit Dice Size",
})


export const SpeedType = z.literal([
	"walking",
	"climbing",
	"swimming",
	"flying",
	"hover",
	"burrowing",
]).meta({
	id: "SpeedType",
	title: "Speed Type",
})

export const Attribute = z.literal([
	"str",
	"dex",
	"con",
	"int",
	"wis",
	"cha",
]).meta({
	id: "Attribute",
	title: "Attribute",
})

export const AttributeValues = z.object({
	str: z.int(),
	dex: z.int(),
	con: z.int(),
	int: z.int(),
	wis: z.int(),
	cha: z.int(),
}).meta({
	id: "AttributeValues",
	title: "Attribute Values",
})

export const Skill = z.literal([
	"athletics",
	"acrobatics",
	"sleight of hand",
	"stealth",
	"arcana",
	"history",
	"investigation",
	"nature",
	"religion",
	"animal handling",
	"insight",
	"medicine",
	"perception",
	"survival",
	"deception",
	"intimidation",
	"performance",
	"persuasion",
]).meta({
	id: "Skill",
	title: "Skill",
})

export const SenseType = z.literal([
	"darkvision",
	"blindsight",
	"tremorsense",
	"truesight",
]).meta({
	id: "SenseType",
	title: "Sense Type",
})
