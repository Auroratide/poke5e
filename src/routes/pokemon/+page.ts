import type { PageLoad } from "./$types"
import { base } from "$app/paths"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon.json`)
		.then(res => res.json())
		.then(data => data.items)

	return { pokemon }
}
