import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition } from "../editions"
import type { EvolutionJson, EvolutionListJson } from "./schema"
import en2024 from "../data/2024/evolutions/en.json"
import en2018 from "../data/2018/evolutions/en.json"

async function all(edition: Edition): Promise<EvolutionListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`./data/2024/contest-effects/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`./data/2018/contest-effects/${locale}.json`)).values,
	)

	const values = chooseEditionData(edition, values2024, {
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
