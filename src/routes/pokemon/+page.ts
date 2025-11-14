import { base } from "$app/paths"
import { PokemonSpecies } from "$lib/creatures/species"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon/v2.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => 
			PokemonSpecies.fromJson(it),
		))

	return { pokemonList: pokemon }
}
