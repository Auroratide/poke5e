<script lang="ts">
	import type { Pokemon } from "./types"
	import { pokemon as allPokemon } from "./store"
	import { moves } from "$lib/moves/store"
	import { base } from "$app/paths"
	import * as pokemonString from "$lib/pokemon/string"
	import * as creatureString from "$lib/creatures/string"

	export let pokemon: Pokemon
	$: evolution = pokemon.evolution
</script>


<section class="evolution">
	<p style:margin-bottom="0.125em">
		<strong>Evolution:</strong> {evolution.stage} / {evolution.maxStage}
	</p>
	{#if $allPokemon && $moves}
		{#if evolution.from?.length > 0}
			<p>
					{pokemon.name} evolves from
					{#each evolution.from as fromId, i}
						{@const from = $allPokemon.find((it) => it.id === fromId)}
						<a href="{base}/pokemon/{from.id}">{from.name}</a>{#if i !== evolution.from.length - 1}, {/if}{/each}.
			</p>
		{/if}
		{#if evolution.to?.length > 0}
			{#each evolution.to as to (to.id)}
					<p>{@html pokemonString.evolution(pokemon.name, to, creatureString.evolutionWithLinks(base, $allPokemon, $moves))}</p>
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