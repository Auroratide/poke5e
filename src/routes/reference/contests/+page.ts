import type { PageLoad } from "./$types"
import { translateContent } from "$lib/site/i18n"
import { Url } from "$lib/site/url"
import type { ContestMoveEffect } from "$lib/moves/contest"

export const load: PageLoad = async ({ fetch }) => {
	const effects: ContestMoveEffect[] = await fetch(Url.api.contestEffects())
		.then((res) => res.json())
		.then((data) => data.items)

	const content2018 = await translateContent((locale) => import(`./(2018)/${locale}.svx`))
	const content2024 = await translateContent((locale) => import(`./(2024)/${locale}.svx`))

	return {
		"2024": content2024,
		"2018": content2018,
		effects,
	}
}
