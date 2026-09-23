import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition, type EditionOverrideList } from "../editions"
import type { ItemJson, ItemListJson } from "./schema"
import raw2024 from "../data/2024/items/en.json"
import raw2018 from "../data/2018/items/en.json"

const en2024 = raw2024 as ItemListJson
const en2018 = raw2018 as EditionOverrideList<ItemJson>

async function all(edition: Edition): Promise<ItemListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`../data/2024/items/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`../data/2018/items/${locale}.json`)).values,
	)

	const values = chooseEditionData<ItemJson>(edition, values2024, {
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
