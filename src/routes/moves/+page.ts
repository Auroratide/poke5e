import type { PageLoad } from "./$types"
import { Move } from "$lib/moves/Move"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch }) => {
	const moves = await fetch(Url.api.moves())
		.then((res) => res.json())
		.then((data) => data.moves)
		.then((moves) => moves.map((it) => new Move(it)))

	return { movesList: moves }
}
