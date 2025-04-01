<script lang="ts" generics="TItem extends HeldItem">
	import Button from "$lib/design/Button.svelte"
	import type { HeldItem } from "../types"
	import ItemEditor from "../pokemon-details/ItemEditor.svelte"
	import type { ItemType } from "$lib/items/types"

	export let values: TItem[]
	export let groupOrder: ItemType[] = []
	export let disabled: boolean
	export let newStandardItem: (id: string) => TItem
	export let newCustomItem: (id: string) => TItem

	let newId = -1001
	const nextNewId = () => (--newId).toString()

	const removeItem = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addStandardItem = () => {
		values = [...values, newStandardItem(nextNewId()) ]
	}

	const addCustomItem = () => {
		values = [...values, newCustomItem(nextNewId()) ]
	}
</script>

{#each values as item (item.id)}
	<ItemEditor value={item} {disabled} {groupOrder} on:remove={removeItem(item.id)} />
{/each}
<span></span>
<div class="row">
	<Button on:click={addStandardItem}>Add Item</Button>
	<Button on:click={addCustomItem}>Add Custom Item</Button>
</div>

<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>