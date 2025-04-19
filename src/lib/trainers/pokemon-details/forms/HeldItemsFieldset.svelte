<script lang="ts">
	import { Fieldset } from "$lib/design/forms"
	import InventoryEditor from "$lib/items/InventoryEditor.svelte"
	import type { HeldItem } from "$lib/trainers/types"

	export let items: HeldItem[]
	export let disabled: boolean

	const addStandardItem = (id: string): HeldItem => ({
		id: id,
		type: "standard",
		itemId: "lum-berry",
	})

	const addCustomItem = (id: string): HeldItem => ({
		id: id,
		type: "custom",
		name: "",
		description: "",
	})
</script>

<Fieldset title="Inventory">
	<InventoryEditor bind:values={items} {disabled} newStandardItem={addStandardItem} newCustomItem={addCustomItem} groupOrder={["berry", "held item", "evolution", "medicine", "pokeball"]} />
</Fieldset>
