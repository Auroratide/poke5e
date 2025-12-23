<script lang="ts">
	import { Fieldset } from "$lib/ui/forms"
	import type { HeldItem } from "$lib/trainers/types"
	import { InventoryEditor } from "$lib/items"

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
