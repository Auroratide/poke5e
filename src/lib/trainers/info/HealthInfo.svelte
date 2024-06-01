<script lang="ts" context="module">
	export type UpdateDetail = {
		currentHp: number,
		currentHitDice: number,
	}
</script>

<script lang="ts">
	import type { Resource } from "../types"
	import { createEventDispatcher } from "svelte"
	import ResourceBar from "$lib/design/ResourceBar.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import NumericResourceInput, { type ChangeDetail } from "$lib/design/Form/NumericResourceInput.svelte"
	import type { HitDice } from "$lib/dnd/types"

	const dispatch = createEventDispatcher()

	export let hp: Resource
	export let hitDice: Resource
	export let dieSize: HitDice
	export let editable: boolean

	$: hpCur = hp.current
	$: hitDiceCur = hitDice.current

	const onChangeHp = (e: CustomEvent<ChangeDetail>) => {
		dispatch("update", {
			currentHp: e.detail.value,
			currentHitDice: hitDiceCur,
		} as UpdateDetail)
	}

	const onChangeHitDice = (e: CustomEvent<ChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: e.detail.value,
		} as UpdateDetail)
	}
</script>

<div class="grid">
	<span class="bar"><ResourceBar current={hpCur} max={hp.max} /></span>
	<span class="hp">
		<VisuallyHidden><label for="current-hp">HP</label></VisuallyHidden>
		<span class="current-hp">
			{#if editable}
				<NumericResourceInput id="current-hp" value={hpCur} on:change={onChangeHp} />
			{:else}
				{hp.current}
			{/if}
		</span>
		<span class="max-hp">/ {hp.max}</span>
	</span>
	<span class="hit-dice">
		<span class="hit-dice-bar"><ResourceBar secondary current={hitDiceCur} max={hitDice.max} /></span>
		<span class="hit-dice-text">
			<VisuallyHidden><label for="current-hit-dice">Hit Dice</label></VisuallyHidden>
			<span class="current-hit-dice">
				{#if editable}
					<NumericResourceInput id="current-hit-dice" value={hitDiceCur} on:change={onChangeHitDice} />
				{:else}
					{hitDice.current}
				{/if}
			</span>
			<span class="max-hit-dice">/ {hitDice.max} ({dieSize})</span>
		</span>
	</span>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: center;
		gap: 0.125em;
	}

	.bar {
		grid-column: span 2;
		display: flex;
	}

	.hp {
		font-size: var(--font-sz-neptune);
	}

	.current-hp {
		--input-min-width: 3ch;
		display: inline-block;
	}

	.hit-dice {
		display: flex;
		flex-direction: column;
		font-size: var(--font-sz-mars);
	}

	.hit-dice-bar {
		margin-bottom: 0.125em;
	}

	.current-hit-dice {
		--input-min-width: 3ch;
		display: inline-block;
	}

	.hit-dice-text {
		align-self: flex-end;
	}
</style>