
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/themes.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const themes = await translateData(
		data.items,
		async (locale) => (await import(`../../../../static/data/${locale}/themes.json`)).items,
	)

	return new Response(JSON.stringify({ themes }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
