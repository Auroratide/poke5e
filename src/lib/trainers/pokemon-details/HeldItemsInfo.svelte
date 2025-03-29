<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { items } from "$lib/items/store"

	export let pokemon: TrainerPokemon
</script>

{#if pokemon.items.length > 0}
	<h3>Held Items</h3>
	<ul>
		{#each pokemon.items as item (item.id)}
			{#if item.type === "standard"}
				{@const standardItem = $items?.find((it) => it.id === item.itemId)}
				<li class:imaged={standardItem?.media.sprite != null} style:--img="url('{standardItem?.media.sprite}')"><strong>{standardItem?.name}</strong>: {standardItem?.description}</li>
			{:else}
				<li><strong>{item.name}</strong>: {item.description}</li>
			{/if}
		{/each}
	</ul>
{/if}

<style>
	ul {
		font-size: var(--font-sz-venus);
		padding: 0 0 0 1.625em;
		list-style: none;
	}

	ul li {
		margin-block-end: 0.75em;
		position: relative;
	}

	.imaged::before {
		content: "";
		position: absolute;
		display: block;
		inset-block-start: -0.1875em;
		inset-inline-start: -1.625em;
		image-rendering: pixelated;
		background-image: var(--img);
		inline-size: 1.5em;
		block-size: 1.5em;
		background-size: contain;
	}
</style>
