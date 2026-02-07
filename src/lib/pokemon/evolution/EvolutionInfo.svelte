<script lang="ts">
	import type { SpeciesIdentifier } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n";
	import { ResolveAsyncText } from "$lib/ui/rendering"
	import type { EvolutionForest } from "./EvolutionForest"
	import EvolutionStage from "./EvolutionStage.svelte"

	export let species: SpeciesIdentifier
	export let evolutions: EvolutionForest | undefined

	$: evolvesFrom = evolutions?.evolvesFrom(species)
	$: evolvesTo = evolutions?.evolvesTo(species)
</script>

<section class="evolution">
	<h2>
		<span class="justify">
			<span>{m["universal.evolution"]()}</span>
			<span class="smaller"><EvolutionStage {evolutions} {species} /></span>
		</span>
	</h2>
	{#if evolutions != null}
		{#if evolvesFrom.length > 0}
			<div class="evolution-section">
				<h3><ResolveAsyncText value={`{{pokemon:${species.data}}} evolves from ${evolvesFrom.map((it) => `{{pokemon::${it.from.data}}}`).join(", ")}.`} /></h3>
				{#each evolvesFrom as from}
					<p><ResolveAsyncText value={from.toString({ link: "from" })} /></p>
				{/each}
			</div>
		{/if}
		{#if evolvesTo.length > 0}
			<div class="evolution-section">
				<h3><ResolveAsyncText value={`{{pokemon:${species.data}}} evolves into ${evolvesTo.map((it) => `{{pokemon::${it.to.data}}}`).join(", ")}.`} /></h3>
				{#each evolvesTo as to}
					<p><ResolveAsyncText value={to.toString({ link: "to" })} /></p>
				{/each}
			</div>
		{/if}
	{/if}
</section>

<style>
	.justify {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline-end: 2.75em;
	}

	.smaller {
		font-size: var(--font-sz-mars);
	}

	.evolution h3 {
		font-size: var(--font-sz-venus);
	}

	.evolution-section {
		margin-block-end: 1.25em;
	} .evolution-section:last-child {
		margin-block-end: 0;
	}

	p {
		font-size: var(--font-sz-venus);
	}
</style>
