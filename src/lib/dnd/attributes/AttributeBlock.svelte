<script lang="ts">
	import { Attributes } from "./Attributes"
	import { PlusMinus } from "$lib/ui/elements"

	export let attributes: Attributes
</script>

<dl>
	{#each Attributes.list as attribute}
		<dt><abbr title="{attribute.name}">{attribute.abbr}</abbr></dt>
		<dd>{attributes[attribute.abbr].score} (<PlusMinus value={attributes[attribute.abbr].modifier} />)</dd>
	{/each}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: auto 1fr;
		grid-auto-flow: column;
		font-size: var(--font-sz-venus);
		text-align: center;
	}

	dt {
		font-weight: 700;
		text-transform: uppercase;
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
		padding: 0.25em 0;
	}

	dd {
		margin: 0;
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		padding-inline: 0.25em;
		padding-block-end: 0.25em;
	}
</style>