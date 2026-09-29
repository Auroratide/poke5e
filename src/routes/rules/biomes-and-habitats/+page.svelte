<script lang="ts">
	import type { BiomeId } from "$lib/poke5e/habitat"
	import { PokemonSpecies, SpeciesStore } from "$lib/poke5e/species"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"

	let {
		data,
	}: {
		data: PageData
	} = $props()

	const species = SpeciesStore.canonList()

	const pokemonByBiome: Record<BiomeId, PokemonSpecies[]> = $derived(data.biomes.reduce((obj, biome) => ({
		...obj,
		[biome.id]: ($species ?? []).filter((it) => it.habitat?.biomes.includes(biome.id)),
	}), {}))
</script>

<ReferencePage title={data.metadata.title}>
	<section>
		<data.Content biomes={data.biomes} pokemonByBiome={pokemonByBiome} />
	</section>
</ReferencePage>
