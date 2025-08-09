import type { Pokemon } from "./types"
import { readable, writable } from "svelte/store"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"
import { PokemonType } from "$lib/pokemon/types-2"
import { GenderRatio } from "./gender"
import { HitDice } from "$lib/dnd/hit-dice"
import { SpeciesRating } from "./sr"

export const pokemon = readable<Pokemon[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/pokemon.json`)
			.then((res) => res.json())
			.then((data) => data.items.map((it) => ({
				...it,
				sr: new SpeciesRating(it.sr),
				gender: new GenderRatio(it.gender),
				type: new PokemonType(it.type),
				skills: SkillRanks.fromList(it.skills),
				attributes: new Attributes(it.attributes),
				hitDice: new HitDice(it.hitDice),
			})))
			.then((pokemon) => set(pokemon))
	}
})

export const filterValue = writable("")
export const currentSorter = writable(() => 0)
