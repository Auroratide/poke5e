<script lang="ts" context="module">
	export type UpdateDetail = {
		currentHp: number,
		currentHitDice: number,
		currentStatus: NonVolatileStatus | null,
		exp: number,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { VisuallyHidden, ResourceBar } from "$lib/ui/elements"
	import {
		NumericResourceField,
		type NumericChangeDetail,
	} from "$lib/ui/forms"
	import type { NonVolatileStatus } from "$lib/pokemon/status"
	import StatusEditor, { type ChangeDetail as StatusChangeDetail } from "$lib/pokemon/StatusEditor.svelte"
	import StatusTag from "$lib/pokemon/StatusTag.svelte"
	import { experienceNeededAtLevel, experienceNeededUntilLevelUp, formatExp } from "$lib/poke5e/experience"
	import { Popover } from "$lib/ui/elements"
	import { HelpIcon } from "$lib/ui/icons"
	import type { Level } from "$lib/dnd/level"
	import type { HitDice } from "$lib/dnd/hit-dice"
	import type { Resource } from "$lib/poke5e/resource"

	const dispatch = createEventDispatcher()

	export let hp: Resource
	export let hitDice: Resource
	export let dieSize: HitDice
	export let exp: number
	export let level: Level
	export let status: NonVolatileStatus | null
	export let hasStatusAndExp: boolean = false
	export let editable: boolean

	$: hpCur = hp.current
	$: hitDiceCur = hitDice.current
	$: statusCur = status

	const onChangeHp = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentHp: e.detail.value,
			currentHitDice: hitDiceCur,
			currentStatus: status,
			exp: exp,
		} as UpdateDetail)
	}

	const onChangeHitDice = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: e.detail.value,
			currentStatus: status,
			exp: exp,
		} as UpdateDetail)
	}

	const onChangeStatus = (e: CustomEvent<StatusChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: hitDiceCur,
			currentStatus: e.detail.value,
			exp: exp,
		} as UpdateDetail)
	}

	const onChangeExp = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			currentHp: hpCur,
			currentHitDice: hitDiceCur,
			currentStatus: status,
			exp: e.detail.value,
		} as UpdateDetail)
	}

	$: expBarMax = experienceNeededUntilLevelUp(experienceNeededAtLevel(level.data), level.data)
	$: expNeeded = experienceNeededUntilLevelUp(exp, level.data)
	$: expBarCur = expBarMax - expNeeded
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
		<span class="hit-dice-bar"><ResourceBar variant="secondary" current={hitDiceCur} max={hitDice.max} /></span>
		<span class="hit-dice-text">
			<VisuallyHidden><label for="current-hit-dice">Hit Dice</label></VisuallyHidden>
			<span class="current-hit-dice">
				{#if editable}
					<NumericResourceField id="current-hit-dice" value={hitDiceCur} on:change={onChangeHitDice} />
				{:else}
					{hitDice.current}
				{/if}
			</span>
			<span class="max-hit-dice">/ {hitDice.max} ({dieSize.data})</span>
		</span>
	</span>
	{#if hasStatusAndExp}
		<span>
			<span class="row">
				{#if status != null}
					<StatusTag value={status} />
				{/if}
				{#if editable}
					<StatusEditor id="current-status" value={statusCur} on:change={onChangeStatus} />
				{/if}
			</span>
		</span>
		<span class="exp">
			<span class="exp-bar"><ResourceBar variant="tertiary" current={expBarCur} max={expBarMax} /></span>
			<span class="exp-text">
				<Popover id="exp-remaining">
					<HelpIcon slot="activator" label="Exp Needed" />
					<p style:text-align="center">{formatExp(expNeeded)} needed until level up.</p>
				</Popover>
				<label for="current-experience">Exp:</label>
				<span class="current-exp">
					{#if editable}
						<NumericResourceField id="current-experience" value={exp} on:change={onChangeExp} />
					{:else}
						{formatExp(exp)}
					{/if}
				</span>
			</span>
		</span>
	{/if}
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

	.hit-dice, .exp {
		display: flex;
		flex-direction: column;
		font-size: var(--font-sz-mars);
	} .exp {
		place-self: start stretch;
	}

	.hit-dice-bar, .exp-bar {
		margin-bottom: 0.125em;
	}

	.current-hit-dice, .current-exp {
		--input-min-width: 3ch;
		display: inline-block;
	}

	.hit-dice-text, .exp-text {
		align-self: flex-end;
	}

	.exp-text {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
		margin-block: 0.5em;
	}
</style>