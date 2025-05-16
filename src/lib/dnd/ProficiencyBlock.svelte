<script lang="ts">
	import { modifierForScore } from "./attributes";
	import { proficiencyBonus } from "./proficiency";
	import type { Attribute, Attributes } from "./types";

	export let values: {
		name: string,
		attr: Attribute,
		proficient: boolean,
	}[]
	export let attributes: Attributes
	export let level: number
	export let columns: number = 1

	$: pb = proficiencyBonus(level)
</script>

<dl style:--columns={columns}>
	{#each values as value, index}
		{@const modifier = modifierForScore(attributes[value.attr]) + (value.proficient ? pb : 0)}
		{@const even = index % (2 * columns) >= columns}
		<dt class:proficient={value.proficient} class:even>{value.name}</dt>
		<dd class:even>{modifier >= 0 ? "+" : ""}{modifier}</dd>
		<dd class:even aria-hidden="true"></dd>	
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
		padding: 0.25em 0.25em 0.25em 1.75em;
	}

	dd {
		padding: 0.25em 0.375em;
	}

	dt.proficient {
		padding-inline-start: 0.25em;
	} dt.proficient::before {
		content: "⦿";
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



	/* dt:nth-child(6n + 1),
	dd:nth-child(6n + 2),
	dd:nth-child(6n + 3) {
		background: var(--skin-bg);
	}

	dt:nth-child(6n + 4),
	dd:nth-child(6n + 5),
	dd:nth-child(6n) {
		background: var(--skin-bg);
	} */
</style>