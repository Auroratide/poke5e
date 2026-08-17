import * as z from "zod"

export const PokeType = z.union([
	z.literal("bug"),
	z.literal("dark"),
	z.literal("dragon"),
	z.literal("electric"),
	z.literal("fairy"),
	z.literal("fighting"),
	z.literal("fire"),
	z.literal("flying"),
	z.literal("ghost"),
	z.literal("grass"),
	z.literal("ground"),
	z.literal("ice"),
	z.literal("normal"),
	z.literal("poison"),
	z.literal("psychic"),
	z.literal("rock"),
	z.literal("steel"),
	z.literal("water"),
])

export const CreatureSize = z.union([
	z.literal("tiny"),
	z.literal("small"),
	z.literal("medium"),
	z.literal("large"),
	z.literal("huge"),
	z.literal("gargantuan"),
])

export const HitDiceSize = z.union([
	z.literal("d4"),
	z.literal("d6"),
	z.literal("d8"),
	z.literal("d10"),
	z.literal("d12"),
	z.literal("d20"),
])

export const SpeedType = z.union([
	z.literal("walking"),
	z.literal("climbing"),
	z.literal("swimming"),
	z.literal("flying"),
	z.literal("hover"),
	z.literal("burrowing"),
])

export const Attribute = z.union([
	z.literal("str"),
	z.literal("dex"),
	z.literal("con"),
	z.literal("int"),
	z.literal("wis"),
	z.literal("cha"),
])

export const AttributeValues = z.object({
	str: z.int(),
	dex: z.int(),
	con: z.int(),
	int: z.int(),
	wis: z.int(),
	cha: z.int(),
})

export const Skill = z.union([
	z.literal("athletics"),
	z.literal("acrobatics"),
	z.literal("sleight of hand"),
	z.literal("stealth"),
	z.literal("arcana"),
	z.literal("history"),
	z.literal("investigation"),
	z.literal("nature"),
	z.literal("religion"),
	z.literal("animal handling"),
	z.literal("insight"),
	z.literal("medicine"),
	z.literal("perception"),
	z.literal("survival"),
	z.literal("deception"),
	z.literal("intimidation"),
	z.literal("performance"),
	z.literal("persuasion"),
])

export const SenseType = z.union([
	z.literal("darkvision"),
	z.literal("blindsight"),
	z.literal("tremorsense"),
	z.literal("truesight"),
])
