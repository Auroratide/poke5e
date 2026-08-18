import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition } from "../editions"
import type { ContestEffectJson, ContestEffectListJson } from "./schema"
import en2024 from "../data/2024/contest-effects/en.json"
import en2018 from "../data/2018/contest-effects/en.json"

async function all(edition: Edition): Promise<ContestEffectListJson> {
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

async function one(id: string, edition: Edition): Promise<ContestEffectJson | undefined> {
	const moves = await all(edition)

	const single = moves.values.find((it) => it.id === id)

	return single
}

export const ContestEffectsSrd = {
	all,
	one,
	ids,
} as const
