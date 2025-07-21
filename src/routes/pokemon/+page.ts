import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"
import { PokemonType } from "$lib/pokemon/types-2"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => ({
			...it,
			type: new PokemonType(it.type),
			skills: SkillRanks.fromList(it.skills),
			attributes: new Attributes(it.attributes),
		})))

	return { pokemonList: pokemon }
}
