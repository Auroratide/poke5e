import * as z from "zod"
import { PokeType } from "../common/schema"

const EvolutionConditionJson = z.discriminatedUnion("type", [
	z.object({ type: z.literal("level"), value: z.int() }),
	z.object({ type: z.literal("item"), value: z.string() }),
	z.object({ type: z.literal("loyalty"), value: z.int() }),
	z.object({ type: z.literal("move"), value: z.string() }),
	z.object({ type: z.literal("move-type"), value: PokeType }),
	z.object({ type: z.literal("gender"), value: z.literal(["male", "female"]) }),
	z.object({ type: z.literal("time"), value: z.literal(["day", "night", "morning", "afternoon"]) }),
	z.object({ type: z.literal("special"), value: z.string() }),
])

const EvolutionEffectJson = z.discriminatedUnion("type", [
	z.object({ type: z.literal("asi"), value: z.int() }),
	z.object({ type: z.literal("special"), value: z.string() }),
])

export const EvolutionJson = z.object({
	id: z.string(),
	from: z.string(),
	to: z.string(),
	conditions: z.array(EvolutionConditionJson),
	effects: z.array(EvolutionEffectJson),
	nonCanon: z.boolean().optional(),
}).meta({
	id: "Evolution",
	title: "Evolution",
})

export const EvolutionListJson = z.object({
	values: z.array(EvolutionJson),
}).meta({
	id: "EvolutionList",
	title: "Evolution List",
})

export type EvolutionJson = z.infer<typeof EvolutionJson>
export type EvolutionListJson = z.infer<typeof EvolutionListJson>
