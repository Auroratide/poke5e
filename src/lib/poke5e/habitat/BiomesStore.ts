import { srdStore } from "$lib/site/stores"
import type { BiomesListJson } from "$lib/srd/biomes/schema"
import { alphabeticalName } from "$lib/utils/sort"
import type { Biome } from "./Biome"

const toBiomes = (json: BiomesListJson): Biome[] =>
	json.values

export const BiomesStore = srdStore((client) =>
	client.biomes.all()
		.then(toBiomes)
		.then((biomes) => biomes.sort(alphabeticalName)),
)
