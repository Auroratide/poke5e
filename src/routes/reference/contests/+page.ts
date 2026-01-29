import type { PageLoad } from "./$types"
import { translateContent } from "$lib/site/i18n"

export const load: PageLoad = async () => {
	return translateContent((locale) => import(`./(content)/${locale}.svx`))
}
