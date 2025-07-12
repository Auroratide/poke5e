<script lang="ts">
	import { modifierForScore } from "./attributes"
	import { proficiencyBonus } from "./proficiency"
	import type { Attribute, Attributes } from "./types"

	export let values: {
		name: string,
		attr: Attribute,
		proficient: boolean,
		expert: boolean,
		extraModifiers?: Record<string, number>,
	}[]
	export let attributes: Attributes
	export let level: number
	export let columnsLg: number = 1
	export let columns: number = 1

	$: pb = proficiencyBonus(level)
</script>

<dl style:--columns={columns} style:--columns-lg={columnsLg}>
	{#each values as value, index}
		{@const modifier = modifierForScore(attributes[value.attr]) + (value.proficient ? pb : 0) + (value.expert ? pb : 0) + (value.extraModifiers?.[value.name] ?? 0)}
		{@const evenLg = index % (2 * columnsLg) >= columnsLg}
		{@const even = index % (2 * columns) >= columns}
		<dt class:even class:even-lg={evenLg}>
			<span class="icon">
				{#if value.expert}
					<abbr title="Expert">★</abbr>
				{:else if value.proficient}
					<abbr title="Proficient">⦿</abbr>
				{/if}
			</span>
			<span>{value.name}</span>
		</dt>
		<dd class:even class:even-lg={evenLg}>{modifier >= 0 ? "+" : ""}{modifier}</dd>
		<dd class:even class:even-lg={evenLg} aria-hidden="true"></dd>
	{/each}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(var(--columns), auto auto 1fr);
		color: var(--skin-bg-text);
		font-size: var(--font-sz-venus);
		overflow: hidden;
	}

	dt {
		padding: 0.25em;
	}

	dd {
		padding: 0.25em 0.375em;
	}

	.icon {
		display: inline-block;
		inline-size: 1.5em;
		text-align: center;
	}

	dd {
		margin: 0;
		text-align: center;
		font-weight: bold;
	}

	dt, dd {
		background: var(--skin-bg-dark);
	} dt.even, dd.even {
		background: var(--skin-bg);
	}

	abbr {
		text-decoration: none;
		cursor: help;
	}

	@media screen and (min-width: 50rem) {
		dl {
			grid-template-columns: repeat(var(--columns-lg), auto auto 1fr);
		}

		dt.even, dd.even {
			background: var(--skin-bg-dark);
		}

		dt.even-lg, dd.even-lg {
			background: var(--skin-bg);
		}
	}
</style>