import { derived, type Readable, type Unsubscriber } from "svelte/store"
import { PokemonSpecies } from "./PokemonSpecies"
import type { SpeciesIdentifier } from "./SpeciesIdentifier"
import type { PokemonJsonResponse } from "./PokemonJsonResponse"
import type { Data } from "$lib/DataClass"
import { fakemonStore } from "$lib/fakemon/store"
import { cachedReadable } from "$lib/utils/store"
import { Url } from "$lib/site/url"

export const allCanonSpecies = cachedReadable<PokemonSpecies[] | undefined>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.pokemon())
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
	completeList: () => Promise<Readable<PokemonSpecies[]>>
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
		canonList: () => {
			return derived(allCanonSpecies, (species) => species?.filter((it) => !it.wasNonCanonNonFakemon()))
		},
		completeList: async () => {
			const fakemon = await fakemonStore.all()

			return derived([allCanonSpecies, fakemon], ([normalSpecies, fakemon]) => {
				return normalSpecies?.concat(fakemon.map((it) => it.species))
			})
		},
	}
}

export const SpeciesStore = createStore()
