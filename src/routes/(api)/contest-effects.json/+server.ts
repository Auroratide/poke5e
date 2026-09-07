
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/contest-effects.json"
import { translateData } from "$lib/site/i18n"

/**
 * Prerendered explicitly for backward compatibility. This endpoint used to be
 * written only because a page fetched it, and nothing does since the move pages
 * moved to the SRD — but clients loaded before that deploy still ask for it.
 */
export const prerender = true

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
