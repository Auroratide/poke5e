import { base } from "$app/paths"
import { derived, readable, writable, type Readable, type Writable } from "svelte/store"
import { Evolution } from "./Evolution"
import { EvolutionForest } from "./EvolutionForest"
import type { EvolutionJsonResponse } from "./EvolutionJsonResponse"
import type { SpeciesIdentifier } from "$lib/creatures/species"
import { provider } from "./data"
import type { Data } from "$lib/DataClass"

export const canonEvolutions = readable<EvolutionForest>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/evolutions/v1.json`)
			.then((res) => res.json())
			.then((data: EvolutionJsonResponse) => data.items.map((it) =>
				Evolution.fromJson(it),
			))
			.then((evolution) => set(new EvolutionForest(evolution)))
	}
})

export interface EvolutionStore {
	get: (species: SpeciesIdentifier) => Readable<EvolutionForest | undefined>
	canonList: () => Readable<EvolutionForest | undefined>
}

function createStore(): EvolutionStore {
	const retrieved = new Map<Data<SpeciesIdentifier>, Writable<boolean>>()

	return {
		get: (species: SpeciesIdentifier) => {
			if (!retrieved.has(species.data)) {
				retrieved.set(species.data, writable(!species.isFakemon()))
			}

			const hasBeenRetrieved = retrieved.get(species.data)

			return derived([canonEvolutions, hasBeenRetrieved], ([forest, hasBeenRetrievedValue]) => {
				if (forest == null) return undefined

				if (!hasBeenRetrievedValue) {
					provider.get(species).then((evolutions) => {
						forest.addAll(evolutions)
						hasBeenRetrieved.set(true)
					})

					return undefined
				}

				return forest
			})
		},
		canonList: () => canonEvolutions,
	}
}

export const EvolutionStore = createStore()
