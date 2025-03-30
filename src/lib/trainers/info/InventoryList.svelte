<script lang="ts">
	import { getItemDetails } from "$lib/pokemon/held-items"
	import type { HeldItem } from "../types"
	import { items as allItems } from "$lib/items/store"

	export let items: HeldItem[]
</script>

<ul>
	{#each items as item (item.id)}
		{@const details = getItemDetails(item, $allItems)}
		{#if details != null}
			<li class:imaged={details.media.sprite != null} style:--img="url('{details.media.sprite}')"><strong>{details.name}</strong>: {details.description}</li>
		{/if}
	{/each}
</ul>

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
