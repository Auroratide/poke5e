import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => ({
			...it,
			attributes: new Attributes(it.attributes),
		})))

	return { pokemonList: pokemon }
}
