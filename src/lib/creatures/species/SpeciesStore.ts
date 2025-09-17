import { derived, readable, type Readable, type Unsubscriber } from "svelte/store"
import { PokemonSpecies } from "./PokemonSpecies"
import type { SpeciesIdentifier } from "./SpeciesIdentifier"
import { base } from "$app/paths"
import type { PokemonJsonResponse } from "./PokemonJsonResponse"
import type { Data } from "$lib/DataClass"
import { fakemonStore } from "$lib/fakemon/store"

export const allCanonSpecies = readable<PokemonSpecies[] | undefined>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/pokemon.json`)
			.then((res) => res.json())
			.then((data: PokemonJsonResponse) => data.items.map((it) =>
				PokemonSpecies.fromJson(it),
			))
			.then((pokemon) => set(pokemon))
	}
})

export type StoredSpecies = Record<Data<SpeciesIdentifier>, SingleStoredSpecies>

export type SingleStoredSpecies = {
	value: PokemonSpecies,
}

export type SingleSpeciesStore = {
	subscribe: (run: (value: SingleStoredSpecies) => void) => Unsubscriber
}

export interface SpeciesStore {
	get: (id: SpeciesIdentifier) => Promise<SingleSpeciesStore | undefined>
	canonList: () => Readable<PokemonSpecies[] | undefined>
}

function createStore(): SpeciesStore {
	return {
		get: async (id: SpeciesIdentifier): Promise<SingleSpeciesStore | undefined> => {
			if (!id.isFakemon()) {
				return derived(allCanonSpecies, (all) => {
					const found = all?.find((it) => it.id.data === id.data)
					if (found == null) return undefined
					return {
						value: found,
					}
				})
			} else {
				const fakemon = await fakemonStore.get(id.toFakemonReadKey())

				if (fakemon == null) return undefined

				return derived(fakemon, (value) => ({
					value: value.value.species,
				}))
			}
		},
		canonList: () => allCanonSpecies,
	}
}

export const SpeciesStore = createStore()
