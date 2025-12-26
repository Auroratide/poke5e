import type { PageLoad } from "./$types"
import { resolve } from "$app/paths"
import { Move } from "$lib/moves/Move"

export const load: PageLoad = async ({ fetch }) => {
	const moves = await fetch(resolve("/moves.json"))
		.then((res) => res.json())
		.then((data) => data.moves)
		.then((moves) => moves.map((it) => new Move(it)))

	return { movesList: moves }
}
