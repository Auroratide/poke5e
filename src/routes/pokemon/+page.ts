import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => ({
			...it,
			skills: SkillRanks.fromList(it.skills),
			attributes: new Attributes(it.attributes),
		})))

	return { pokemonList: pokemon }
}
