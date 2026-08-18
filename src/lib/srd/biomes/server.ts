import { translateData } from "$lib/site/i18n"
import type { BiomeJson, BiomesListJson } from "./schema"
import en2024 from "../data/2024/biomes/en.json"
import en2018 from "../data/2018/biomes/en.json"
import { chooseEditionData, type Edition } from "../editions"

async function all(edition: Edition): Promise<BiomesListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`./data/2024/biomes/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`./data/2018/biomes/${locale}.json`)).values,
	)

	const values = chooseEditionData(edition, values2024, {
		"2018": values2018,
	})

	return { values }
}

function ids(): string[] {
	return en2024.values.map((it) => it.id)
}

async function one(id: string, edition: Edition): Promise<BiomeJson | undefined> {
	const values = await all(edition)

	const single = values.values.find((it) => it.id === id)

	return single
}

export const BiomesSrd = {
	all,
	ids,
	one,
} as const
