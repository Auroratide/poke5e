import type { PageLoad } from "./$types"
import type { Ability, AbilityJson } from "$lib/pokemon/ability"
import type { Data } from "$lib/DataClass"
import { Url } from "$lib/site/url"

export const load: PageLoad<{ abilities: Data<Ability>[] }> = async ({ fetch }) => {
	const abilities: Data<Ability>[] = await fetch(Url.api.abilities())
		.then(res => res.json())
		.then(data => data.abilities)
		.then((abilities: AbilityJson[]) => abilities.map((it) => ({
			referenceId: it.id,
			name: it.name,
			description: it.description,
			deprecated: it.deprecated,
		})))
		.then(abilities => abilities.filter((it) => !it.deprecated))

	return { abilities }
}
``