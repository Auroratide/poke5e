<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import type { HeldItem } from "../types"
	import HeldItemEditor from "../pokemon-details/HeldItemEditor.svelte"

	export let values: HeldItem[]
	export let disabled: boolean

	let newId = -1001
	const nextNewMoveId = () => (--newId).toString()

	const removeItem = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addStandardItem = () => {
		values = [...values, {
			id: nextNewMoveId(),
			type: "standard",
			itemId: "lum-berry",
		} ]
	}

	const addCustomItem = () => {
		values = [...values, {
			id: nextNewMoveId(),
			type: "custom",
			name: "",
			description: "",
		} ]
	}
</script>

<Fieldset title="Held Items">
	{#each values as item (item.id)}
		<HeldItemEditor value={item} {disabled} on:remove={removeItem(item.id)} />
	{/each}
	<span></span>
	<div class="row">
		<Button on:click={addStandardItem}>Add Item</Button>
		<Button on:click={addCustomItem}>Add Custom Item</Button>
	</div>
</Fieldset>

<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>