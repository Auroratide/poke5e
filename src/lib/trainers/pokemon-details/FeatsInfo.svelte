<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import { abilities } from "$lib/pokemon/store"

	export let pokemon: TrainerPokemon
	export let species: Pokemon

	$: ability =
		species.abilities.find((it) => it.id === pokemon.ability) ??
		$abilities?.find((it) => it.id === pokemon.ability)
</script>

{#if ability}
	<p><strong>{ability.name}</strong>: {ability.description}</p>
{/if}

<style>
	p {
		font-size: var(--font-sz-venus);
	}
</style>
