<script lang="ts">
	import type { HeldItem } from "../types"
	import { ItemStore } from "$lib/items/store"
	import { createEventDispatcher } from "svelte"
	import { Button } from "$lib/ui/elements"
	import { Item, type ItemType } from "$lib/items"

	const dispatch = createEventDispatcher()

	export let value: HeldItem
	export let groupOrder: ItemType[] = []
	export let disabled: boolean = false

	$: itemGroups = Item.groupByType($ItemStore ?? [], groupOrder)

	const onRemove = () => {
		dispatch("remove")
	}
</script>

{#if value.type === "standard"}
	<label for="item-id-input-{value.id}">Item</label>
	<div class="flex-row">
		<select id="item-id-input-{value.id}" bind:value={value.itemId} style:flex="1" {disabled}>
			{#each itemGroups as group}
				<optgroup label="{group.name}">
					{#each group.items as item (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</optgroup>
			{/each}
		</select>
		<Button on:click={onRemove}>Remove</Button>
	</div>
{:else}
	<label for="item-name-input-{value.id}">Name</label>
	<div class="flex-row">
		<input id="item-name-input-{value.id}" type="text" bind:value={value.name} style:flex="1" {disabled} />
		<Button on:click={onRemove}>Remove</Button>
	</div>
	<label for="item-description-input-{value.id}" style:place-self="start">Desc.</label>
	<textarea id="item-description-input-{value.id}" rows="4" bind:value={value.description} {disabled}></textarea>
{/if}
<hr />

<style>
	.flex-row {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	textarea {
		font-size: var(--font-sz-venus);
	}

	hr {
		grid-column: span 2;
		margin: 0.25em 0;
		background: none;
		border: none;
	}
</style>
