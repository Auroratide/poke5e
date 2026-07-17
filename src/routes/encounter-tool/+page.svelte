<script lang="ts">
	import type { Biome } from "$lib/poke5e/habitat"
	import { SpeciesStore } from "$lib/poke5e/species"
	import { Title } from "$lib/ui/layout"
	import type { PageData } from "./$types"
	import EncounterTool from "./EncounterTool.svelte"

	let {
		data,
	}: {
		data: PageData
	} = $props()

	let biomes: Biome[] = $derived(data.biomes?.item?.biomes ?? [])
	const canonSpecies = SpeciesStore.canonList()
	const allSpecies = SpeciesStore.completeList()
</script>

<Title value="Encounter Tool" />

{#await allSpecies}
	<EncounterTool species={canonSpecies} biomes={biomes} />
{:then allSpecies} 
	<EncounterTool species={allSpecies} biomes={biomes} />
{/await}
