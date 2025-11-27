<script lang="ts" context="module">
	export type UpdateQuantityDetail = {
		id: string,
		quantity: number,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { getItemDetails } from "$lib/pokemon/held-items"
	import type { HeldItem, MaybeQuantity } from "../types"
	import { items as allItems } from "$lib/items/store"
	import {
		NumericResourceField,
		type NumericChangeDetail,
	} from "$lib/ui/forms"
	const dispatch = createEventDispatcher()

	export let items: (HeldItem & MaybeQuantity)[]
	export let editable: boolean = false

	const onChangeQuantity = (item: HeldItem) => (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			id: item.id,
			quantity: e.detail.value,
		} as UpdateQuantityDetail)
	}
</script>

<ul>
	{#each items as item (item.id)}
		{@const details = getItemDetails(item, $allItems)}
		{#if details != null}
			<li class:imaged={details.media.sprite != null} style:--img="url('{details.media.sprite}')">
				{#if details.quantity != null}
					<div>
						<strong>{details.name}</strong>
						<span class="editable-quantity">
							<label for="quantity-{details.id}" aria-label="Quantity">&times;</label>
							{#if editable}
								<NumericResourceField id="quantity-{details.id}" value={details.quantity} on:change={onChangeQuantity(details)} />
							{:else}
								<span>{details.quantity}</span>
							{/if}
						</span>
						<p>{details.description}</p>
					</div>
				{:else}
					<strong>{details.name}</strong>: {details.description}
				{/if}
			</li>
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

	.editable-quantity {
		--input-min-width: 3ch;
	}
</style>
