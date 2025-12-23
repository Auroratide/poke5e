import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import type { Ability } from "$lib/pokemon/ability"
import type { Data } from "$lib/DataClass"

export const load: PageLoad<{ abilities: Data<Ability>[] }> = async ({ fetch }) => {
	const abilities: Data<Ability>[] = await fetch(`${base}/abilities.json`)
		.then(res => res.json())
		.then(data => data.abilities)

	return { abilities }
}
