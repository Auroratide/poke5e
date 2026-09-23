import { derived, type Readable } from "svelte/store"
import { srdStore } from "$lib/site/stores"
import type { BiomesListJson } from "$lib/srd/biomes/schema"
import { alphabeticalName } from "$lib/utils/sort"
import type { Biome } from "./Biome"

const toBiomes = (json: BiomesListJson): Biome[] =>
	json.values

const allBiomes = srdStore((client) =>
	client.biomes.all()
		.then(toBiomes)
		.then((biomes) => biomes.sort(alphabeticalName)),
)

export const BiomesStore: Readable<Biome[] | undefined> = derived(allBiomes, (it) => it.result)
