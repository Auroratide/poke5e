import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition } from "../editions"
import type { ItemJson, ItemListJson } from "./schema"
import en2024 from "../data/2024/items/en.json"
import en2018 from "../data/2018/items/en.json"

async function all(edition: Edition): Promise<ItemListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`./data/2024/items/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`./data/2018/items/${locale}.json`)).values,
	)

	const values = chooseEditionData(edition, values2024, {
		"2018": values2018,
	})

	return { values }
}

function ids(): string[] {
	return en2024.values.map((it) => it.id)
}

async function one(id: string, edition: Edition): Promise<ItemJson | undefined> {
	const values = await all(edition)

	const single = values.values.find((it) => it.id === id)

	return single
}

export const ItemsSrd = {
	all,
	one,
	ids,
} as const
