import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(`${base}/pokemon/${params.id}.json`).then(async res => {
		if (res.status === 404)
			error(404)
		else {
			const pokemonData = await res.json()

			return {
				pokemon: {
					...pokemonData,
					skills: SkillRanks.fromList(pokemonData.skills),
					attributes: new Attributes(pokemonData.attributes),
				},
			}
		}
	})
}
