import { derived, readable, type Readable, type Unsubscriber } from "svelte/store"
import { PokemonSpecies } from "./PokemonSpecies"
import type { SpeciesIdentifier } from "./SpeciesIdentifier"
import type { Data } from "$lib/DataClass"
import { fakemonStore } from "$lib/fakemon/store"
import { emptyFakemonListStore } from "$lib/fakemon/store/FakemonListStore"
import type { PokemonListJson } from "$lib/srd/pokemon/schema"
import { srdStore } from "$lib/site/stores"

const toSpecies = (json: PokemonListJson) =>
	Promise.all(json.values.map(PokemonSpecies.fromJson))

export const allCanonSpecies = srdStore<PokemonSpecies[]>((client) => {
	return client.pokemon.all()
		.then(toSpecies)
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
	// This is used for SSR
	emptyList: () => Readable<PokemonSpecies[]>
}

function createStore(): SpeciesStore {
	return {
		get: async (id: SpeciesIdentifier): Promise<SingleSpeciesStore | undefined> => {
			if (!id.isFakemon()) {
				return derived(allCanonSpecies, (all) => {
					const found = all.result?.find((it) => it.id.data === id.data)
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
			return derived(allCanonSpecies, (species) => species.result?.filter((it) => !it.wasNonCanonNonFakemon()))
		},
		completeList: async () => {
			const fakemon = await fakemonStore.all().catch(() => emptyFakemonListStore())

			return derived([allCanonSpecies, fakemon], ([normalSpecies, fakemon]) => {
				return normalSpecies.result
					?.filter((it) => !it.wasNonCanonNonFakemon())
					?.concat(fakemon.map((it) => it.species))
			})
		},
		emptyList: () => {
			return readable([])
		},
	}
}

export const SpeciesStore = createStore()
