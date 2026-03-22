import type { Data } from "$lib/DataClass"
import { Url } from "$lib/site/url"
import { readable } from "svelte/store"
import { ReferenceAbility } from "."

export const AbilityStore = readable<ReferenceAbility[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.abilities())
			.then(res => res.json())
			.then((data) => data.abilities)
			.then((abilities: Data<ReferenceAbility>[]) => abilities.map((it) => new ReferenceAbility(it)))
			.then((abilities) => set(abilities))
	}
})
