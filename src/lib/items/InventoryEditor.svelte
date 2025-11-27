<script lang="ts" generics="TItem extends HeldItem">
	import { focusInputField } from "$lib/ui/forms"
	import { Button } from "$lib/ui/elements"
	import type { ItemType } from "./types"
	import ItemEditor, { getItemFieldName } from "./ItemEditor.svelte"
	import type { HeldItem } from "$lib/trainers/types"
	
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
		const nextId = nextNewId()
		values = [...values, newStandardItem(nextId) ]
		focusInputField(getItemFieldName(nextId))
	}

	const addCustomItem = () => {
		const nextId = nextNewId()
		values = [...values, newCustomItem(nextId) ]
		focusInputField(getItemFieldName(nextId))
	}
</script>

<div class="inventory-editor">
	{#each values as item (item.id)}
		<ItemEditor value={item} {disabled} {groupOrder} on:remove={removeItem(item.id)} />
	{/each}
	<div class="row">
		<Button on:click={addStandardItem}>Add Item</Button>
		<Button on:click={addCustomItem}>Add Custom Item</Button>
	</div>
</div>

<style>
	.inventory-editor {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>