<script lang="ts" context="module">
	export type UpdateDetail = {
		money: number,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import NumericResourceInput, { type ChangeDetail as NumericChangeDetail } from "$lib/design/Form/NumericResourceInput.svelte"
	import { formatMoney } from "$lib/pokemon/money"

	const dispatch = createEventDispatcher()

	export let money: number
	export let editable: boolean

	const onChangeMoney = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			money: e.detail.value,
		} as UpdateDetail)
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

<style>
	label { font-weight: bold; }
	.row { display: flex; }
</style>
