import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition, type EditionOverrideList } from "../editions"
import type { EvolutionJson, EvolutionListJson } from "./schema"
import raw2024 from "../data/2024/evolutions/en.json"
import raw2018 from "../data/2018/evolutions/en.json"

const en2024 = raw2024 as EvolutionListJson
const en2018 = raw2018 as EditionOverrideList<EvolutionJson>

async function all(edition: Edition): Promise<EvolutionListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`../data/2024/evolutions/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`../data/2018/evolutions/${locale}.json`)).values,
	)

	const values = chooseEditionData<EvolutionJson>(edition, values2024, {
		"2018": values2018,
	})

	return { values }
}

function ids(): string[] {
	return en2024.values.map((it) => it.id)
}

async function one(id: string, edition: Edition): Promise<EvolutionJson | undefined> {
	const values = await all(edition)

	const single = values.values.find((it) => it.id === id)

	return single
}

export const EvolutionsSrd = {
	all,
	one,
	ids,
} as const
