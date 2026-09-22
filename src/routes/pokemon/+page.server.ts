import type { PageServerLoad } from "./$types"
import { PokemonListing } from "$lib/poke5e/species"
import { DEFAULT_SRD_EDITION } from "$lib/site/edition"
import { SrdClient } from "$lib/srd"

export const load: PageServerLoad = async ({ fetch }) => {
	const client = new SrdClient(DEFAULT_SRD_EDITION, fetch)

	const pokemon = await client.pokemon.all()

	return {
		pokemonList: pokemon.values
			.filter((it) => !PokemonListing.wasNonCanonNonFakemon(it))
			.map(PokemonListing.project),
	}
}
