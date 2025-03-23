import type { Ability } from "./types"
import { readable, derived } from "svelte/store"
import { base } from "$app/paths"
import { pokemon } from "$lib/creatures/store"
import type { Pokemon } from "$lib/creatures/types"

export const abilities = readable<Omit<Ability, "hidden">[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/abilities.json`)
			.then(res => res.json())
			.then(data => set(data.abilities))
	}
})

export const pokemonWithAbilities = derived([abilities, pokemon], ([abilities, pokemon], set: (state: Record<string, Pokemon[]>) => void) => {
	if (abilities == null || pokemon == null || abilities?.length === 0 || pokemon?.length === 0)
		return set(undefined)

	const pokemonHasAbility = (ability: Ability) => (pokemon: Pokemon) =>
		pokemon.abilities.find((it) => it.id === ability.id) != null

	set(abilities.reduce((all, ability) => ({
		...all,
		[ability.id]: pokemon.filter(pokemonHasAbility(ability)),
	}), {}))
}, undefined)
