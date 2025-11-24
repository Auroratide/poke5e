import { base } from "$app/paths"
import { derived, get, writable, type Readable, type Unsubscriber, type Writable } from "svelte/store"
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

export const allEvolutions = cachedReadable<EvolutionForest>(undefined, (set) => {
	let unsub: Unsubscriber = undefined
	unsub = canonEvolutions.subscribe((canonEvolutions) => {
		if (canonEvolutions != null) {
			set(canonEvolutions.clone())
			unsub?.()
		}
	})
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

	// Needed in order to recursively refetch an entire evo line reliably
	const reset = (evolution: Evolution) => {
		retrieved.get(evolution.from.data)?.set(false)
		retrieved.get(evolution.to.data)?.set(false)
	}

	return {
		get: (species: SpeciesIdentifier) => {
			if (!retrieved.has(species.data)) {
				retrieved.set(species.data, writable(!species.isFakemon()))
			}

			const hasBeenRetrieved = retrieved.get(species.data)

			return derived([allEvolutions, hasBeenRetrieved], ([forest, hasBeenRetrievedValue]) => {
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
			const forest = get(allEvolutions)
			if (forest == null) {
				// TODO!!!!!!!!!
				throw new Error("Theoretically unreachable")
			}

			const toReset: Evolution[] = []

			await Promise.all(updates.map(async (update) => {
				if (update.type === "upsert" && update.evolution.isDraft()) {
					const addedEvolution = await provider.add(update.evolution.data, update.writeKeys)

					forest.addAll([addedEvolution])
					toReset.push(addedEvolution)
				} else if (update.type === "upsert") {
					const updatedEvolution = await provider.update(update.evolution, update.writeKeys, update.originalKeys)

					forest.update(updatedEvolution)
					toReset.push(updatedEvolution)
				} else if (update.type === "remove") {
					await provider.remove(update.evolution.id, update.writeKeys)

					forest.remove(update.evolution)
				}
			}))

			// must happen after all updates to not refetch old evolutions
			toReset.forEach((it) => reset(it))
		},

		canonList: () => canonEvolutions,
	}
}

export const EvolutionStore = createStore()
