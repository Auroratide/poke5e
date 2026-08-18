import * as z from "zod"

export const EvolutionJson = z.object({
	id: z.string(),
	from: z.string(),
	to: z.string(),
	conditions: z.array(z.object({
		type: z.string(),
		value: z.union([z.string(), z.number()]),
	})),
	effects: z.array(z.object({
		type: z.string(),
		value: z.union([z.string(), z.number()]),
	})),
})

export const EvolutionListJson = z.object({
	values: z.array(EvolutionJson),
})

export type EvolutionJson = z.infer<typeof EvolutionJson>
export type EvolutionListJson = z.infer<typeof EvolutionListJson>
