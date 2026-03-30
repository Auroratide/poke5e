
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/origins.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const origins = await translateData(
		data.items,
		async (locale) => (await import(`../../../../static/data/${locale}/origins.json`)).items,
	)

	return new Response(JSON.stringify({ items: origins }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
