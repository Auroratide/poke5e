import * as z from "zod"

export const BiomeJson = z.object({
	id: z.string(),
	name: z.string(),
}).meta({
	id: "Biome",
	title: "Biome",
})

export const BiomesListJson = z.object({
	values: z.array(BiomeJson),
}).meta({
	id: "BiomeList",
	title: "Biome List",
})

export type BiomeJson = z.infer<typeof BiomeJson>
export type BiomesListJson = z.infer<typeof BiomesListJson>
