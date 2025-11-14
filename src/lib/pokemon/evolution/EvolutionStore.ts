import { base } from "$app/paths"
import { readable, type Readable } from "svelte/store"
import { Evolution } from "./Evolution"
import { EvolutionForest } from "./EvolutionForest"
import type { EvolutionJsonResponse } from "./EvolutionJsonResponse"

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
	canonList: () => Readable<EvolutionForest | undefined>
}

function createStore(): EvolutionStore {
	return {
		canonList: () => canonEvolutions,
	}
}

export const EvolutionStore = createStore()
