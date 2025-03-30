<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import InventoryList from "../info/InventoryList.svelte"

	export let pokemon: TrainerPokemon
</script>

{#if pokemon.items.length > 0}
	<h3>Held {#if pokemon.items.length === 1}Item{:else}Items{/if}</h3>
	<InventoryList items={pokemon.items} />
{/if}
