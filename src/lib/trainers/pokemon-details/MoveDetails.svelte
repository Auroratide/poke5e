<script lang="ts" context="module">
	export type UpdatePpDetail = {
		value: number,
	}
</script>

<script lang="ts">
	import { base } from "$app/paths"
	import { NumericResourceField } from "$lib/design/forms"
	import type { ChangeDetail } from "$lib/design/forms/NumericResourceField.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import type { Attributes } from "$lib/dnd/attributes"
	import MoveDescription from "$lib/moves/MoveDescription.svelte"
	import { deriveMovePowers } from "$lib/moves/MovePowers"
	import type { Move } from "$lib/moves/types"
	import type { PokeType } from "$lib/pokemon/types"
	import { createEventDispatcher } from "svelte"
	import type { LearnedMove } from "../types"
	import PlusMinus from "$lib/design/PlusMinus.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import type { Level } from "$lib/dnd/level"

	const dispatch = createEventDispatcher()

	export let move: LearnedMove
	export let moveData: Move
	export let level: Level
	export let pokemonType: PokeType[]
	export let attributes: Attributes
	export let editable: boolean

	$: currentPp = move.pp.current

	$: movePowers = deriveMovePowers(moveData, {
		attributes: attributes,
		level: level,
		type: pokemonType,
	})

	const onChangePp = (e: CustomEvent<ChangeDetail>) => {
		dispatch("update", {
			value: e.detail.value ?? 0,
		} as UpdatePpDetail)
	}
</script>

<div class="vstack space-after">
	<div class="vstack bg-by-type rounded space-inner" style:--bg="var(--skin-{moveData.type}-bg)">
		<div class="hrow space-after-tiny">
			<span class="flex-span"><a href="{base}/moves/{move.moveId}">{moveData.name}</a></span>
			<span class="pp">
				<VisuallyHidden><label for="current-hp">{moveData.name} PP</label></VisuallyHidden>
				<span class="current">
					{#if editable}
						<NumericResourceField id="current-pp-{move.moveId}" value={currentPp} on:change={onChangePp}  />
					{:else}
						{currentPp}
					{/if}
				</span>
				<span class="max">/ {move.pp.max}</span>
			</span>
		</div>
		<div class="hrow tiny-font">
			<span class="capitalize flex-span">{moveData.type}</span>
			<span>
				{#if movePowers != null}
					To Hit: <PlusMinus value={movePowers.toHit} />, DC: {movePowers.dc}, Dmg: <PlusMinus value={movePowers.dmg} />
				{/if}
			</span>
		</div>
	</div>
	<div class="space-inner smaller-font">
		<FlatDl columns={1}>
			<dt>Range</dt>
			<dd class="cap">{moveData.range}</dd>
			<dt>Time</dt>
			<dd>{moveData.time}</dd>
			<dt>Duration</dt>
			<dd class="cap">{moveData.duration}</dd>
		</FlatDl>
		<div style:margin-block-end="0.5em"></div>
		<MoveDescription move={moveData} />
	</div>
	{#if move.notes !== undefined && move.notes.length > 0}
		<hr />
		<div class="space-inner smaller-font">{move.notes}</div>
	{/if}
</div>

<style>
	.vstack {
		display: flex;
		flex-direction: column;
	}

	.space-after {
		margin-block-end: 1rem;
	}

	.space-after-tiny {
		margin-block-end: 0.125rem;
	}

	.hrow {
		display: flex;
		flex-direction: row;
	}

	.bg-by-type {
		background: var(--bg);
		color: var(--skin-bg-text);
	}

	.bg-by-type a {
		color: var(--skin-bg-text);
		text-decoration: none;
	}

	.bg-by-type a:hover,
	.bg-by-type a:focus {
		text-decoration: underline;
	}

	.flex-span {
		flex: 1;
	}

	.pp {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
		align-items: center;
	}

	.rounded {
		border-radius: 0.25rem;
	}

	.space-inner {
		padding: 0.5rem 1rem;
	}

	.smaller-font {
		font-size: var(--font-sz-venus);
	}

	.tiny-font {
		font-size: var(--font-sz-mars);
	}

	.capitalize {
		text-transform: capitalize;
	}
</style>