import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition } from "../editions"
import type { TmJson, TmListJson } from "./schema"
import en2024 from "../data/2024/tms/en.json"
import en2018 from "../data/2018/tms/en.json"

async function all(edition: Edition): Promise<TmListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`../data/2024/tms/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`../data/2018/tms/${locale}.json`)).values,
	)

	const values = chooseEditionData(edition, values2024, {
		"2018": values2018,
	})

	return { values }
}

function ids(): string[] {
	return en2024.values.map((it) => it.id.toString())
}

async function one(id: string, edition: Edition): Promise<TmJson | undefined> {
	const tms = await all(edition)

	const single = tms.values.find((it) => it.id.toString() === id)

	return single
}

export const TmsSrd = {
	all,
	one,
	ids,
} as const
