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
