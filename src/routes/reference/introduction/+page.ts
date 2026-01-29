import type { PageLoad } from "./$types"
import { getLocale } from "$lib/site/i18n"
import EnContent, { metadata as enMetadata } from "./(content)/en.svx"

export const load: PageLoad = async () => {
	const locale = getLocale()

	try {
		const content = await import(`./(content)/${locale}.svx`)

		return {
			Content: content.default,
			metadata: content.metadata,
		}
	} catch (e) {
		return {
			Content: EnContent,
			metadata: enMetadata,
		}
	}
}
