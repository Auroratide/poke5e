import { readable } from "svelte/store"
import { resolve } from "$app/paths"
import { Ability } from "./ability"
import type { Data } from "$lib/DataClass"

export const abilities = readable<Ability[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(resolve("/abilities.json"))
			.then(res => res.json())
			.then((data) => data.abilities)
			.then((abilities: Data<Ability>[]) => abilities.map((it) => new Ability(it)))
			.then((abilities) => set(abilities))
	}
})
