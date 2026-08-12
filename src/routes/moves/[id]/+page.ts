import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { Move } from "$lib/moves/Move"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch, params }) => {
	// TODO: Enable the SRD version of this when ready
	// const client2018 = new SrdClient("2018", fetch)
	// const client2024 = new SrdClient("2024", fetch)

	// const [move2018, move2024] = await Promise.all([
	// 	client2018.moves.one(params.id),
	// 	client2024.moves.one(params.id),
	// ])
		
	// if (move2018 == null && move2024 == null) {
	// 	error(404)
	// }

	// return {
	// 	move: {
	// 		"2018": new Move(move2018),
	// 		"2024": new Move(move2024),
	// 	}
	// }

	return fetch(Url.api.moves(params.id)).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				move: new Move(await res.json()),
			}
	})
}
