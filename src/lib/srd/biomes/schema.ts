import * as z from "zod"

export const BiomeJson = z.object({
	id: z.string(),
	name: z.string(),
})

export const BiomesListJson = z.object({
	values: z.array(BiomeJson),
})

export type BiomeJson = z.infer<typeof BiomeJson>
export type BiomesListJson = z.infer<typeof BiomesListJson>
