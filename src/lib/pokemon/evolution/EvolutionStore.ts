import { base } from "$app/paths"
import { derived, get, writable, type Readable, type Writable } from "svelte/store"
import { Evolution } from "./Evolution"
import { EvolutionForest } from "./EvolutionForest"
import type { EvolutionJsonResponse } from "./EvolutionJsonResponse"
import type { SpeciesIdentifier } from "$lib/creatures/species"
import { provider } from "./data"
import type { Data } from "$lib/DataClass"
import type { EvolutionWriteKeys } from "./data/EvolutionDataProvider"
import { cachedReadable } from "$lib/store"

export const canonEvolutions = cachedReadable<EvolutionForest>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/evolutions/v1.json`)
			.then((res) => res.json())
			.then((data: EvolutionJsonResponse) => data.items.map((it) =>
				Evolution.fromJson(it),
			))
			.then((evolution) => set(new EvolutionForest(evolution)))
	}
})

export type EvolutionUpdate = {
	type: "upsert" | "remove"
	evolution: Evolution,
	writeKeys: EvolutionWriteKeys,
	originalKeys?: EvolutionWriteKeys,
}

export interface EvolutionStore {
	get: (species: SpeciesIdentifier) => Readable<EvolutionForest | undefined>
	update: (updates: EvolutionUpdate[]) => Promise<void>
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

		update: async (updates: EvolutionUpdate[]) => {
			const forest = get(canonEvolutions)
			if (forest == null) {
				// TODO!!!!!!!!!
				throw new Error("Theoretically unreachable")
			}

			for (const update of updates) {
				if (update.type === "upsert" && update.evolution.isDraft()) {
					const addedEvolution = await provider.add(update.evolution.data, update.writeKeys)

					forest.addAll([addedEvolution])
				}
			}

			// get tree if it is alive? otherwise wait for it.
			// step 1: attempt to save every single one. we need to know if it is new or not.
			// step 2: save these to the forest, somehow?
			// step 3: return
		},

		canonList: () => canonEvolutions,
	}
}

export const EvolutionStore = createStore()
