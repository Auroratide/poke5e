import { translateData } from "$lib/site/i18n"
import type { BiomesListJson } from "./schema"
import en from "../data/2024/biomes/en.json"

async function all(): Promise<BiomesListJson> {
	const values = await translateData(
		en.values,
		async (locale) => (await import(`./data/2024/biomes/${locale}.json`)).values,
	)

	return { values }
}

export const BiomesSrd = {
	all,
} as const
