<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import InventoryEditor from "./InventoryEditor.svelte"
	import type { InventoryItem } from "../types"

	export let money: number
	export let inventory: InventoryItem[]
	export let disabled: boolean

	const addStandardItem = (id: string): InventoryItem => ({
		id: id,
		type: "standard",
		itemId: "poke-ball",
		quantity: 1,
	})

	const addCustomItem = (id: string): InventoryItem => ({
		id: id,
		type: "custom",
		name: "",
		description: "",
		quantity: 1,
	})
</script>

<Fieldset title="Inventory">
	<label for="money-input">Money</label>
	<span>
		<span>₽</span>
		<input id="money-input" type="number" name="money" bind:value={money} step="1" max="2000000000" min="-2000000000" {disabled} required />
	</span>
	<InventoryEditor bind:values={inventory} {disabled} newStandardItem={addStandardItem} newCustomItem={addCustomItem} />
</Fieldset>
