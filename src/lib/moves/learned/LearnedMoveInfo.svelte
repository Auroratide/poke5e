<script lang="ts">
	import type { Attributes } from "$lib/dnd/attributes"
	import type { Level } from "$lib/dnd/level"
	import { MoveStatsInfo } from "$lib/moves"
	import MoveDescription from "$lib/moves/MoveDescription.svelte"
	import type { Stab } from "$lib/pokemon/stab"
	import type { PokemonType } from "$lib/pokemon/types"
	import { rulesVersion } from "$lib/site/rules-version"
	import { Url } from "$lib/site/url"
	import { FlatDl, LoaderInline, VisuallyHidden } from "$lib/ui/elements"
	import { NumericResourceField, type NumericChangeDetail } from "$lib/ui/forms"
	import { MovesStore } from "../store"
	import type { LearnedMove } from "./LearnedMove"

	// needed because svelte strips away ending spaces
	const COMMA_SPACE = ", "

	let {
		value,
		level,
		stab,
		pokemonType,
		attributes,
		editable = false,
		onupdatepp,
	}: {
		value: LearnedMove,
		level: Level,
		stab: Stab,
		pokemonType: PokemonType,
		attributes: Attributes,
		editable?: boolean,
		onupdatepp: (value: number) => void,
	} = $props()

	const move = $derived($MovesStore?.find((it) => it.id === value.moveId))
	const currentPp = $derived(value.pp.current)
	const moveStats = $derived(move?.calculateMoveStats($rulesVersion, {
		attributes: attributes,
		level: level,
		type: pokemonType.data,
		stab: stab,
	}))

	const attributeList = $derived(move?.power.attributeList())
	const bestPowers = $derived(move?.power.bestAttribute(attributes))

	const onChangePp = (e: CustomEvent<NumericChangeDetail>) => {
		onupdatepp(e.detail.value)
	}
</script>

{#if move && moveStats && attributeList && bestPowers}
	<div class="vstack space-after">
		<div class="vstack bg-by-type rounded space-inner" style:--bg="var(--skin-{move.type}-bg)">
			<div class="hrow space-after-tiny">
				<span class="flex-span bold"><a href="{Url.moves(value.moveId)}">{move.name}</a></span>
				<span class="pp">
					<VisuallyHidden><label for="current-hp">{move.name} PP</label></VisuallyHidden>
					<span class="current">
						{#if editable}
							<NumericResourceField id="current-pp-{value.moveId}" value={currentPp} on:change={onChangePp}  />
						{:else}
							{currentPp}
						{/if}
					</span>
					<span class="max">/ {value.pp.max}</span>
				</span>
			</div>
			<div class="hrow tiny-font">
				<span class="capitalize flex-span">{move.type}</span>
				<span class="capitalize">
					{#if move.contest}
						{move.contest.contest}
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
						{move.power.toString()}
					{:else}
						{#each attributeList as attribute, i}
							{@const needComma = i !== attributeList.length - 1}
							{#if bestPowers.includes(attribute)}
								<strong>{attribute}</strong>{#if needComma}<span>{COMMA_SPACE}</span>{/if}
							{:else}
								<span>{attribute}</span>{#if needComma}<span>{COMMA_SPACE}</span>{/if}
							{/if}
						{/each}
					{/if}
				</dd>
				<dt>Range</dt>
				<dd class="cap">{move.range}</dd>
				<dt>Time</dt>
				<dd>{move.time}</dd>
				<dt>Duration</dt>
				<dd class="cap">{move.duration}</dd>
			</FlatDl>
			<div style:margin-block-end="0.5em"></div>
			<MoveDescription move={move} />
		</div>
		{#if value.notes !== undefined && value.notes.length > 0}
			<hr />
			<div class="space-inner smaller-font">{value.notes}</div>
		{/if}
	</div>
{:else}
	<LoaderInline />
{/if}

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