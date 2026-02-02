import type { PageLoad } from "./$types"
import { getLocale } from "$lib/site/i18n"

export const load: PageLoad = async () => {
	const locale = getLocale()

	try {
		const content = await import(`./(content)/${locale}.svx`)

		return {
			Content: content.default,
			metadata: content.metadata,
		}
	} catch (e) {
		const content = await import(`./(content)/en.svx`)

		return {
			Content: content.default,
			metadata: content.metadata,
		}
	}
}
