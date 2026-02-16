
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/contest-effects.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const effects = await translateData(
		data.items,
		async (locale) => (await import(`../../../../static/data/${locale}/contest-effects.json`)).items,
	)

	return new Response(JSON.stringify({ items: effects }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
