import type { RequestHandler } from "./$types"
import data from "../../../../../static/data/items.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async ({ params }) => {
	const item = data.items.find(it => it.id === params.id)

	if (item !== undefined) {
		const translated = await translateData(
			[item],
			async (locale) => (await import(`../../../../../static/data/${locale}/items.json`)).items,
		)

		return new Response(JSON.stringify(translated[0]), { status: 200 })
	} else {
		return new Response(null, { status: 404 })
	}
}
