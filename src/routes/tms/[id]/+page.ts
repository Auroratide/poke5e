import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import type { Data } from "$lib/DataClass"
import { Move } from "$lib/moves/Move"
import type { Tm } from "$lib/moves/tms/Tm"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(Url.api.moves()).then(async (res) => {
		const data: { moves: Data<Move>[] } = await res.json()
		const moves = data.moves.map((it) => new Move(it))

		const tm = moves.find((it) => it.tm?.id?.toString() === params.id)

		if (tm == null)
			error(404)
		else
			return {
				tm: tm as Tm,
			}
	})
}
