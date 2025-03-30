<script lang="ts" context="module">
	export type UpdateDetail = {
		money: number,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import NumericResourceInput, { type ChangeDetail as NumericChangeDetail } from "$lib/design/Form/NumericResourceInput.svelte"
	import { formatMoney } from "$lib/pokemon/money"
	import InventoryList, { type UpdateQuantityDetail } from "../info/InventoryList.svelte"
	import type { InventoryItem } from "../types"
	import { error } from "$lib/design/errors/store"

	const dispatch = createEventDispatcher()

	export let money: number
	export let inventory: InventoryItem[]
	export let editable: boolean

	const onChangeMoney = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			money: e.detail.value,
		} as UpdateDetail)
	}

	const onChangeQuantity = (e: CustomEvent<UpdateQuantityDetail>) => {
		const originalItem = inventory.find((it) => it.id === e.detail.id)
		if (originalItem == null) {
			error.show("Could not update item quantity. It seems to be missing?")
			return
		}

		const newItem = {
			...originalItem,
			quantity: e.detail.quantity,
		}

		dispatch("update-item", newItem)
	}
</script>

<h2>Inventory</h2>
<p class="row" style:gap="0.5em">
	<label for="current-money">Money:</label>
	<span style:flex="1">
		{#if editable}
			<span class="row" style:gap="0.25em">
				<span>₽</span>
				<span style:flex="1">
					<NumericResourceInput id="current-money" value={money} on:change={onChangeMoney} />
				</span>
			</span>
		{:else}
			{formatMoney(money)}
		{/if}
	</span>
</p>
<InventoryList items={inventory} {editable} on:update={onChangeQuantity} />

<style>
	label { font-weight: bold; }
	.row { display: flex; }
</style>
