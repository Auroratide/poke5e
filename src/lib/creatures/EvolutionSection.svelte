<script lang="ts">
	import { moves } from "$lib/moves/store"
	import { base } from "$app/paths"
	import * as pokemonString from "$lib/pokemon/string"
	import * as creatureString from "$lib/creatures/string"
	import { SpeciesStore, type PokemonSpecies } from "./species"

	export let pokemon: PokemonSpecies

	const allPokemon = SpeciesStore.canonList()

	$: evolution = pokemon.data.evolution
</script>


<section class="evolution">
	<h2>Evolution</h2>
	<p style:margin-bottom="0.125em">
		<strong>Evolution:</strong> {evolution.stage} / {evolution.maxStage}
	</p>
	{#if $allPokemon && $moves}
		{#if evolution.from?.length > 0}
			<p>
				{pokemon.data.name} evolves from
				{#each evolution.from as fromId, i}
					{@const from = $allPokemon.find((it) => it.id.data === fromId)}
					<a href="{base}/pokemon/{from.id}">{from.data.name}</a>{#if i !== evolution.from.length - 1}, {/if}{/each}.
			</p>
		{/if}
		{#if evolution.to?.length > 0}
			{#each evolution.to as to (to.id)}
				<p>{@html pokemonString.evolution(pokemon.data.name, to, creatureString.evolutionWithLinks(base, $allPokemon, $moves))}</p>
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