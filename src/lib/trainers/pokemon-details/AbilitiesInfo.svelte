<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { AbilityStore } from "$lib/pokemon/ability"

	export let pokemon: TrainerPokemon

	$: ability = $AbilityStore?.find((it) => it.id === pokemon.ability)
</script>

{#if ability}
	<p><strong>{ability.name}</strong>: {ability.description}</p>
{/if}

<style>
	p {
		font-size: var(--font-sz-venus);
	}
</style>
