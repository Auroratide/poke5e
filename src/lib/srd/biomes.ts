import * as z from "zod"
import { translateData } from "$lib/site/i18n"
import en from "./data/2024/biomes/en.json"

export const BiomeJson = z.object({
	id: z.string(),
	name: z.string(),
})

export const BiomesListJson = z.object({
	values: z.array(BiomeJson),
})

export type BiomeJson = z.infer<typeof BiomeJson>
export type BiomesListJson = z.infer<typeof BiomesListJson>

export async function biomes(): Promise<BiomesListJson> {
	const values = await translateData(
		en.values,
		async (locale) => (await import(`./data/2024/biomes/${locale}.json`)).values,
	)

	return { values }
}
