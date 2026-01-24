import type { PageLoad } from "./$types"
import type { Ability } from "$lib/pokemon/ability"
import type { Data } from "$lib/DataClass"
import { Url } from "$lib/site/url"

export const load: PageLoad<{ abilities: Data<Ability>[] }> = async ({ fetch }) => {
	const abilities: Data<Ability>[] = await fetch(Url.api.abilities())
		.then(res => res.json())
		.then(data => data.abilities)
		.then(abilities => abilities.filter((it) => !it.deprecated))

	return { abilities }
}
