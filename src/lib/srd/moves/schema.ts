import * as z from "zod"
import { Attribute, PokeType } from "../common/schema"

const TableJson = z.object({
	type: z.string(),
	headers: z.array(z.string()),
	rows: z.array(z.array(z.string())),
})

export const MoveJson = z.object({
	id: z.string(),
	name: z.string(),
	type: z.union([PokeType, z.literal("varies"), z.literal("typeless"), z.literal("stellar")]),
	power: z.union([
		z.array(Attribute),
		z.string(),
	]),
	time: z.string(),
	pp: z.int(),
	duration: z.string(),
	range: z.string(),
	description: z.array(z.union([z.string(), TableJson])),
	higherLevels: z.optional(z.string()),
	optional: z.optional(z.array(z.union([z.string(), TableJson]))),
	damage: z.optional(z.object({
		dice: z.object({
			"1": z.union([z.int(), z.string()]),
			"5": z.union([z.int(), z.string()]),
			"10": z.union([z.int(), z.string()]),
			"17": z.union([z.int(), z.string()]),
		}),
		modifier: z.union([z.number(), z.string()]),
		type: z.union([z.string(), z.array(PokeType)]),
	})),
	attack: z.optional(z.object({
		scope: z.string(),
	})),
	save: z.optional(z.object({
		attribute: z.array(Attribute),
		dc: z.string(),
	})),
	tm: z.optional(z.object({
		id: z.int(),
		cost: z.int(),
	})),
	beta: z.optional(z.boolean()),
}).meta({
	id: "Move",
	title: "Move",
})

export const MovesListJson = z.object({
	values: z.array(MoveJson),
}).meta({
	id: "MoveList",
	title: "Move List",
})

export type MoveJson = z.infer<typeof MoveJson>
export type MovesListJson = z.infer<typeof MovesListJson>
