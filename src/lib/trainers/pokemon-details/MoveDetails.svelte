<script lang="ts" context="module">
	export type UpdatePpDetail = {
		value: number,
	}
</script>

<script lang="ts">
	import { NumericResourceField, type NumericChangeDetail } from "$lib/ui/forms"
	import { VisuallyHidden } from "$lib/ui/elements"
	import type { Attributes } from "$lib/dnd/attributes"
	import MoveDescription from "$lib/moves/MoveDescription.svelte"
	import { createEventDispatcher } from "svelte"
	import type { LearnedMove } from "../types"
	import { FlatDl } from "$lib/ui/elements"
	import type { Level } from "$lib/dnd/level"
	import type { PokemonType } from "$lib/pokemon/types"
	import type { Move } from "$lib/moves/Move"
	import { Url } from "$lib/site/url"
	import { MoveStatsInfo } from "$lib/moves"
	import { rulesVersion } from "$lib/site/rules-version"

	const dispatch = createEventDispatcher()

	export let move: LearnedMove
	export let moveData: Move
	export let level: Level
	export let pokemonType: PokemonType
	export let attributes: Attributes
	export let editable: boolean

	$: currentPp = move.pp.current

	$: moveStats = moveData.calculateMoveStats($rulesVersion, {
		attributes: attributes,
		level: level,
		type: pokemonType.data,
	})

	$: attributeList = moveData.power.attributeList()
	$: bestPowers = moveData.power.bestAttribute(attributes)

	const onChangePp = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			value: e.detail.value ?? 0,
		} as UpdatePpDetail)
	}
</script>

<div class="vstack space-after">
	<div class="vstack bg-by-type rounded space-inner" style:--bg="var(--skin-{moveData.type}-bg)">
		<div class="hrow space-after-tiny">
			<span class="flex-span bold"><a href="{Url.moves(move.moveId)}">{moveData.name}</a></span>
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
			<span class="capitalize">
				{#if moveData.contest}
					{moveData.contest.contest}
				{/if}
			</span>
		</div>
	</div>
	{#if Object.values(moveStats).filter((it) => it != null).length > 0}
		<div class="move-stats">
			<MoveStatsInfo value={moveStats} />
		</div>
	{/if}
	<div class="space-inner smaller-font">
		<FlatDl columns={1}>
			<dt>Power</dt>
			<dd class="upper">
				{#if attributeList.length === 0}
					{moveData.power.toString()}
				{:else}
					{#each attributeList as attribute, i}
						{@const needComma = i !== attributeList.length - 1}
						{#if bestPowers.includes(attribute)}
							<strong>{attribute}</strong>{#if needComma}<span>, </span>{/if}
						{:else}
							<span>{attribute}</span>{#if needComma}<span>, </span>{/if}
						{/if}
					{/each}
				{/if}
			</dd>
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
		border-radius: 0.25em;
	} .rounded:has(+ .move-stats) {
		border-radius: 0.25em 0.25em 0 0;
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

	.bold {
		font-weight: bold;
	}
</style>