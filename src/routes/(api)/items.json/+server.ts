import type { RequestHandler } from "./$types"
import data from "../../../../static/data/items.json"
import { getLocale, translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	let items = data.items.filter((it) => it.description != null)

	items = await translateData(
		items,
		async (locale) => (await import(`../../../../static/data/${locale}/items.json`)).items,
	)

	return new Response(JSON.stringify({ items }), { status: 200 })
}
