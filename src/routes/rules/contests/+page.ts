import type { PageLoad } from "./$types"
import { translateContent } from "$lib/site/i18n"
import { SrdClient } from "$lib/srd"

export const load: PageLoad = async ({ fetch }) => {
	const effects = await SrdClient.forEachEdition(async (client) => {
		const effects = await client.contestEffects.all()

		return effects.values
	}, fetch)

	const content2018 = await translateContent((locale) => import(`./(2018)/${locale}.svx`))
	const content2024 = await translateContent((locale) => import(`./(2024)/${locale}.svx`))

	return {
		"2024": content2024,
		"2018": content2018,
		effects,
	}
}
