<script lang="ts" context="module">
	export type UpdateDetail = {
		currentHp: number,
		currentHitDice: number,
		currentStatus: NonVolatileStatus | null,
	}
</script>

<script lang="ts">
	import type { Resource } from "../types"
	import { createEventDispatcher } from "svelte"
	import ResourceBar from "$lib/design/ResourceBar.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import {
		NumericResourceField,
		type NumericChangeDetail,
	} from "$lib/design/forms"
	import type { HitDice } from "$lib/dnd/types"
	import type { NonVolatileStatus } from "$lib/pokemon/status"
	import StatusEditor, { type ChangeDetail as StatusChangeDetail } from "$lib/pokemon/StatusEditor.svelte"
	import StatusTag from "$lib/pokemon/StatusTag.svelte"

	const dispatch = createEventDispatcher()

	export let hp: Resource
	export let hitDice: Resource
	export let dieSize: HitDice
	export let status: NonVolatileStatus | null
	export let hasStatus: boolean = false
	export let editable: boolean

	$: hpCur = hp.current
	$: hitDiceCur = hitDice.current
	$: statusCur = status

	const onChangeHp = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentHp: e.detail.value,
			currentHitDice: hitDiceCur,
			currentStatus: status,
		} as UpdateDetail)
	}

	const onChangeHitDice = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: e.detail.value,
			currentStatus: status,
		} as UpdateDetail)
	}

	const onChangeStatus = (e: CustomEvent<StatusChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: hitDiceCur,
			currentStatus: e.detail.value,
		} as UpdateDetail)
	}
</script>

<div class="grid">
	<span class="bar"><ResourceBar current={hpCur} max={hp.max} /></span>
	<span class="hp">
		<VisuallyHidden><label for="current-hp">HP</label></VisuallyHidden>
		<span class="current-hp">
			{#if editable}
				<NumericResourceField id="current-hp" value={hpCur} on:change={onChangeHp} />
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
					<NumericResourceField id="current-hit-dice" value={hitDiceCur} on:change={onChangeHitDice} />
				{:else}
					{hitDice.current}
				{/if}
			</span>
			<span class="max-hit-dice">/ {hitDice.max} ({dieSize})</span>
		</span>
	</span>
</div>
{#if hasStatus}
	<div class="row">
		{#if status != null}
			<StatusTag value={status} />
		{/if}
		{#if editable}
			<StatusEditor id="current-status" value={statusCur} on:change={onChangeStatus} />
		{/if}
	</div>
{/if}

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

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
		margin-block: 0.5em;
	}
</style>