import { Url } from "$lib/site/url"
import { Ability } from "."
import { cachedReadable } from "$lib/utils/store"

export type AbilityJson = {
	id: string,
	name: string,
	description: string,
	deprecated?: boolean,
}

export const AbilityStore = cachedReadable<Ability[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.abilities())
			.then(res => res.json())
			.then((data) => data.abilities)
			.then((abilities: AbilityJson[]) => abilities.map((it) => new Ability({
				referenceId: it.id,
				name: it.name,
				description: it.description,
				deprecated: it.deprecated,
			})))
			.then((abilities) => set(abilities))
	}
})
