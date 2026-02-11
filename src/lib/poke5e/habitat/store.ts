import { readable } from "svelte/store"
import type { Biome } from "./Biome"
import { Url } from "$lib/site/url"

export const BiomesStore = readable<Biome[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.biomes())
			.then(res => res.json())
			.then((data) => data.biomes)
			.then((biomes: Biome[]) => biomes.sort((a, b) => a.name.localeCompare(b.name)))
			.then((biomes) => set(biomes))
	}
})
