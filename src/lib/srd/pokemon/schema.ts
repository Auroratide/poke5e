import * as z from "zod"
import { Attribute, AttributeValues, CreatureSize, HitDiceSize, PokeType, SenseType, Skill, SpeedType } from "../common/schema"

export const PokemonJson = z.object({
	id: z.string(),
	name: z.string(),
	number: z.int(),
	type: z.array(PokeType),
	size: z.union([CreatureSize, z.literal("varies")]),
	sr: z.number(),
	minLevel: z.number(),
	eggGroup: z.array(z.string()),
	gender: z.string(),
	description: z.string(),
	ac: z.int(),
	hp: z.int(),
	hitDice: HitDiceSize,
	speed: z.array(z.object({
		type: SpeedType,
		value: z.int(),
	})),
	attributes: AttributeValues,
	skills: z.array(Skill),
	savingThrows: z.array(Attribute),
	senses: z.array(z.object({
		type: SenseType,
		value: z.int(),
	})),
	abilities: z.array(z.object({
		id: z.string(),
		hidden: z.boolean(),
	})),
	specialAbilityText: z.string().optional(),
	forms: z.object({
		description: z.string(),
	}).optional(),
	moves: z.object({
		start: z.array(z.string()),
		level2: z.optional(z.array(z.string())),
		level6: z.optional(z.array(z.string())),
		level10: z.optional(z.array(z.string())),
		level14: z.optional(z.array(z.string())),
		level18: z.optional(z.array(z.string())),
		tm: z.optional(z.array(z.int())),
		egg: z.optional(z.array(z.string())),
	}),
	media: z.object({
		main: z.string(),
		sprite: z.string().optional(),
		mainShiny: z.string().optional(),
		spriteShiny: z.string().optional(),
		mainF: z.string().optional(),
		spriteF: z.string().optional(),
		mainShinyF: z.string().optional(),
		spriteShinyF: z.string().optional(),
		attribution: z.string().optional(),
	}),
	habitat: z.object({
		biomes: z.array(z.string()),
		nativeRegion: z.string(),
		regions: z.array(z.string()),
	}),
	unofficial: z.boolean().optional(),
}).meta({
	id: "Pokemon",
	title: "Pokemon",
})

export const PokemonListJson = z.object({
	values: z.array(PokemonJson),
}).meta({
	id: "PokemonList",
	title: "Pokemon List",
})

export type PokemonJson = z.infer<typeof PokemonJson>
export type PokemonListJson = z.infer<typeof PokemonListJson>
