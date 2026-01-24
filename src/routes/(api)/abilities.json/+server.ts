
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/abilities.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const abilities = await translateData(
		data.items,
		async (locale) => (await import(`../../../../static/data/${locale}/abilities.json`)).items,
	)

	return new Response(JSON.stringify({ abilities }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
