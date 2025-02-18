import type { PageLoad } from "./$types"
import { base } from "$app/paths"

export const load: PageLoad = async ({ fetch }) => {
	const moves = await fetch(`${base}/moves.json`)
		.then(res => res.json())
		.then(data => data.moves)

	return { movesList: moves }
}
