import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import type { Data } from "$lib/DataClass"
import { Move } from "$lib/moves/Move"
import type { Tm } from "$lib/moves/tms/Tm"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(resolve("/moves.json")).then(async (res) => {
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
