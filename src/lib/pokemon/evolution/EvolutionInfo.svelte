<script lang="ts">
	import type { SpeciesIdentifier } from "$lib/creatures/species"
	import { ResolveAsyncText } from "$lib/rendering"
	import type { EvolutionForest } from "./EvolutionForest"
	import EvolutionStage from "./EvolutionStage.svelte"

	export let species: SpeciesIdentifier
	export let evolutions: EvolutionForest | undefined

	$: evolvesFrom = evolutions?.evolvesFrom(species)
	$: evolvesTo = evolutions?.evolvesTo(species)
</script>

<section class="evolution">
	<h2>Evolution</h2>
	{#if evolutions != null}
		<p style:margin-bottom="0.125em">
			<strong>Evolution:</strong> <EvolutionStage {evolutions} {species} />
		</p>
		{#if evolvesFrom.length > 0}
			<p><ResolveAsyncText value={`{{pokemon:${species.data}}} evolves from ${evolvesFrom.map((it) => `{{pokemon::${it.from.data}}}`).join(", ")}.`} /></p>
		{/if}
		{#if evolvesTo.length > 0}
			{#each evolvesTo as to}
				<p><ResolveAsyncText value={to.toString()} /></p>
			{/each}
		{:else}
			<p>This pokemon is at its highest evolutionary state.</p>
		{/if}
	{/if}
</section>

<style>
	p {
		font-size: var(--font-sz-venus);
	}
</style>
