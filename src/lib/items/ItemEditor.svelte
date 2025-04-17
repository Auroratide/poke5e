<script lang="ts">
	import { MarkdownField, SelectField, TextField, Removable } from "$lib/design/forms"
	import type { HeldItem } from "$lib/trainers/types"
	import { groupByType } from "./group"
	import { items } from "./store"
	import type { ItemType } from "./types"

	export let value: HeldItem
	export let groupOrder: ItemType[] = []
	export let disabled: boolean = false

	$: itemGroups = groupByType($items ?? [], groupOrder)
	$: itemOptions = itemGroups.map((group => ({
		name: group.name,
		values: group.items.map((item) => ({
			name: item.name,
			value: item.id,
		})),
	})))
</script>

{#if value.type === "standard"}
	<Removable on:remove>
		<SelectField label="Item" name="item-id-{value.id}" bind:value={value.itemId} options={itemOptions} {disabled} />
	</Removable>
{:else}
	<Removable on:remove>
		<TextField label="Name" name="item-name-{value.id}" bind:value={value.name} {disabled} />
	</Removable>
	<MarkdownField label="Item Description" name="item-description-{value.id}" bind:value={value.description} {disabled} />
{/if}
<hr />

<style>
	hr {
		grid-column: span 2;
		margin: 0.25em auto;
		background: none;
		border: none;
		border-block-end: 0.0625em dotted var(--skin-bg);
	}
</style>
