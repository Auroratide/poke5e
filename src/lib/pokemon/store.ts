import type { Data } from "$lib/DataClass"
import { Url } from "$lib/site/url"
import { readable } from "svelte/store"
import { Ability } from "./ability"

export const abilities = readable<Ability[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.abilities())
			.then(res => res.json())
			.then((data) => data.abilities)
			.then((abilities: Data<Ability>[]) => abilities.map((it) => new Ability(it)))
			.then((abilities) => set(abilities))
	}
})
