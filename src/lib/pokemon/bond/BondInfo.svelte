<script lang="ts" context="module">
	export type UpdateDetail = {
		currentBondPoints: number,
	}
</script>

<script lang="ts">
	import {
		NumericResourceField,
		type NumericChangeDetail,
	} from "$lib/ui/forms"
	import { createEventDispatcher } from "svelte"
	import type { PokemonBond } from "../../trainers/types"
	import { BondIcon } from "./icons"
	import { PlusMinus } from "$lib/ui/elements"
	import { BondEffects } from "./BondEffects"
	import { Popover } from "$lib/ui/elements"

	const dispatch = createEventDispatcher()

	export let value: PokemonBond
	export let editable: boolean

	$: bondCur = value.points.current
	$: bondEffect = $BondEffects[value.level]

	const onChangeBondPoints = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentBondPoints: e.detail.value,
		} as UpdateDetail)
	}
</script>


<div class="bond-info">
	{#if bondEffect}
		<Popover id="bond-effect-popover" block>
			<p class="row" slot="activator">
				<span class="icon"><BondIcon level={value.level} /></span>
				<strong class="small-text dotted">Bond: <PlusMinus value={value.level} /></strong>
			</p>
			<p class="small-text">{bondEffect}</p>
		</Popover>
	{:else}
		<p class="row">
			<span class="icon"><BondIcon level={value.level} /></span>
			<strong class="small-text">Bond: <PlusMinus value={value.level} /></strong>
		</p>
	{/if}
	{#if value.points.max > 0}
		<p class="bond-points smaller-text row">
			<label for="current-bond-points">Points:</label>
			<span>
				{#if editable}
					<NumericResourceField id="current-bond-points" value={bondCur} on:change={onChangeBondPoints} />
				{:else}
					{value.points.max}
				{/if}
			</span>
			<span class="max-hit-dice">/ {value.points.max}</span>
		</p>
	{/if}
</div>

<style>
	p {
		margin: 0;
	}

	.bond-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2em;
		margin-block-end: 0.25em;
	}

	.small-text {
		font-size: var(--font-sz-venus);
	}

	.smaller-text {
		font-size: var(--font-sz-mars);
	}

	.icon {
		font-size: 1.125em;
		display: inline-block;
		inline-size: 1em;
		block-size: 1em;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
		line-height: 1;
	}

	.bond-points {
		--input-min-width: 3ch;
	}

	.dotted {
		border-block-end: 0.125em dotted currentColor;
	}
</style>