<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import type { HeldItem } from "../types"
	import InventoryEditor from "./InventoryEditor.svelte"

	export let values: HeldItem[]
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

<Fieldset title="Held Items">
	<InventoryEditor bind:values {disabled} newStandardItem={addStandardItem} newCustomItem={addCustomItem} />
</Fieldset>
