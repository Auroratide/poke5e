import type { Ability } from "./types"
import { readable } from "svelte/store"
import { base } from "$app/paths"

export const abilities = readable<Omit<Ability, "hidden">[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/abilities.json`)
			.then(res => res.json())
			.then(data => set(data.abilities))
	}
})