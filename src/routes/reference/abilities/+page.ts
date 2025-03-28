import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import type { Ability } from "$lib/pokemon/types"

export const load: PageLoad<{ abilities: Ability[] }> = async ({ fetch }) => {
	const abilities: Ability[] = await fetch(`${base}/abilities.json`)
		.then(res => res.json())
		.then(data => data.abilities)

	return { abilities }
}
