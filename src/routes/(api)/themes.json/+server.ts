
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/biomes.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const biomes = await translateData(
		data.items,
		async (locale) => (await import(`../../../../static/data/${locale}/biomes.json`)).items,
	)

	return new Response(JSON.stringify({ biomes }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
