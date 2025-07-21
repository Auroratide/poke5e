import type { Pokemon } from "./types"
import { readable, writable } from "svelte/store"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"
import { PokemonType } from "$lib/pokemon/types-2"

export const pokemon = readable<Pokemon[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/pokemon.json`)
			.then((res) => res.json())
			.then((data) => data.items.map((it) => ({
				...it,
				type: new PokemonType(it.type),
				skills: SkillRanks.fromList(it.skills),
				attributes: new Attributes(it.attributes),
			})))
			.then((pokemon) => set(pokemon))
	}
})

export const filterValue = writable("")
export const currentSorter = writable(() => 0)
