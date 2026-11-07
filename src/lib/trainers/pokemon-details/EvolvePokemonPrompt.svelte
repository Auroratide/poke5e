<script lang="ts">
	import CenterStage from "$lib/poke5e/level-up/effects/CenterStage.svelte"
	import FromTo from "$lib/poke5e/level-up/effects/FromTo.svelte"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n"
	import { Button, Level } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { ResolveAsyncText } from "$lib/ui/rendering"
	import type { TrainerPokemon } from "../types"
	import { Level as DndLevel } from "$lib/dnd/level"
	import type { Evolution } from "$lib/pokemon/evolution"

	let {
		pokemon,
		species,
		nextLevel,
		eligibleEvolutions,
		backHref,
		skipEvolution,
		goToEvolve,
	}: {
		pokemon: TrainerPokemon,
		species: PokemonSpecies,
		nextLevel: DndLevel,
		eligibleEvolutions: Evolution[],
		backHref: string,
		skipEvolution: () => void,
		goToEvolve: () => void,
	} = $props()
</script>

<section>
	<CenterStage>
		<FromTo>
			{#snippet from()}
				<Level value={pokemon.level.data} />
			{/snippet}
			{#snippet to()}
				<Level value={nextLevel.data} />
			{/snippet}
		</FromTo>
	</CenterStage>
</section>
<section>
	<CenterStage>
		<strong>{m.levelUpCanEvolve({ name: pokemon.nickname ?? species.name })}</strong>
	</CenterStage>
	<div class="evolution-descriptions">
		{#each eligibleEvolutions as evolution (evolution.id)}
			<p><ResolveAsyncText value={evolution.toString()} /></p>
		{/each}
	</div>
	<p>{m.levelUpEvolvePrompt()}</p>
</section>
<ActionArea>
	<Button href={backHref} variant="subtle">{m.back()}</Button>
	<Button on:click={skipEvolution} variant="subtle">{m.dontEvolve()}</Button>
	<Button on:click={goToEvolve}>{m.evolve()}</Button>
</ActionArea>

<style>
	.evolution-descriptions {
		font-size: var(--font-sz-venus);
		border-inline: 0.25em solid var(--skin-bg);
		padding-inline: 1em;
		padding-block: 0.25em;
		margin-block-end: 1.5em;
	}

	.evolution-descriptions p:last-child {
		margin: 0;
	}
</style>