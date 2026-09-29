import type { PageLoad } from "./$types"
import { translateContent } from "$lib/site/i18n"
import { SrdClient } from "$lib/srd"
import { DEFAULT_SRD_EDITION } from "$lib/site/edition"

export const load: PageLoad = async ({ fetch }) => {
	const client = new SrdClient(DEFAULT_SRD_EDITION, fetch)

	const biomes = await client.biomes.all()
	const content = await translateContent((locale) => import(`./(content)/${locale}.svx`))

	return {
		...content,
		biomes: biomes.values,
	}
}
