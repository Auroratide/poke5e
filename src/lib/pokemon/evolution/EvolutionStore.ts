import { derived, get, writable, type Readable, type Unsubscriber, type Writable } from "svelte/store"
import { Evolution } from "./Evolution"
import { EvolutionForest } from "./EvolutionForest"
import type { EvolutionJsonResponse } from "./EvolutionJsonResponse"
import { SpeciesIdentifier } from "$lib/poke5e/species"
import { provider } from "./data"
import type { Data } from "$lib/DataClass"
import type { EvolutionWriteKeys } from "./data/EvolutionDataProvider"
import { cachedReadable } from "$lib/utils/store"
import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { Url } from "$lib/site/url"

export const canonEvolutions = cachedReadable<EvolutionForest>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.evolutions())
			.then((res) => res.json())
			.then((data: EvolutionJsonResponse) => data.items.map((it) =>
				Evolution.fromJson(it),
			))
			.then((evolution) => evolution.filter((it) => !it.nonCanon))
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
	all: () => Readable<EvolutionForest | undefined>
	update: (updates: EvolutionUpdate[]) => Promise<void>
	canonList: () => Readable<EvolutionForest | undefined>
}

function createStore(): EvolutionStore {
	const retrievedSpeciesStore = new Map<Data<SpeciesIdentifier>, Writable<boolean>>()
	const allRetrieved = writable(false)

	const hasBeenRetrieved = (species: SpeciesIdentifier) => {
		if (!retrievedSpeciesStore.has(species.data)) {
			retrievedSpeciesStore.set(species.data, writable(!species.isFakemon()))
		}

		return retrievedSpeciesStore.get(species.data)
	}

	const didRetrieve = (species: SpeciesIdentifier) => {
		if (!retrievedSpeciesStore.has(species.data)) {
			retrievedSpeciesStore.set(species.data, writable(true))
		} else {
			retrievedSpeciesStore.get(species.data)?.set(true)
		}
	}

	// Needed in order to recursively refetch an entire evo line reliably
	const reset = (evolution: Evolution) => {
		retrievedSpeciesStore.get(evolution.from.data)?.set(false)
		retrievedSpeciesStore.get(evolution.to.data)?.set(false)
	}

	return {
		get: (species: SpeciesIdentifier) => {
			const hasBeenRetrievedStore = hasBeenRetrieved(species)

			return derived([allEvolutions, hasBeenRetrievedStore], ([forest, hasBeenRetrievedValue]) => {
				if (forest == null) return undefined

				if (!hasBeenRetrievedValue) {
					provider.get(species).then((evolutions) => {
						forest.addAll(evolutions)
						hasBeenRetrievedStore.set(true)
					})

					return undefined
				}

				return forest
			})
		},

		all: () => {
			return derived([allEvolutions, allRetrieved], ([forest, hasBeenRetrieved]) => {
				if (forest == null) return undefined

				if (!hasBeenRetrieved) {
					Promise.all(FakemonLocalStorage.list().map((info) => {
						const species = SpeciesIdentifier.fromFakemonReadKey(info.readKey)

						return provider.get(species).then((evolutions) => {
							forest.addAll(evolutions)
							didRetrieve(species)
						})
					})).then(() => {
						allRetrieved.set(true)
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
