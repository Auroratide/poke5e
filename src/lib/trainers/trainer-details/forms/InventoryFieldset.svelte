<script lang="ts">
	import { Fieldset, MoneyField } from "$lib/ui/forms"
	import type { InventoryItem } from "$lib/trainers/types"
	import { InventoryEditor } from "$lib/items"

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
	<MoneyField label="Money" bind:value={money} {disabled}/>
	<InventoryEditor bind:values={inventory} {disabled} newStandardItem={addStandardItem} newCustomItem={addCustomItem} groupOrder={["pokeball", "medicine", "berry", "held item", "evolution"]} />
</Fieldset>
