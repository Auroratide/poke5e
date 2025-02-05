<script lang="ts">
	import type { PokeType } from "./types"

	export let type: PokeType[]

	let showAll = false
	const toggleShowAll = () => showAll = !showAll
</script>

<span class="type-tag">
	{#if type.length === 1}
		<span class="type" style:--skin-local-bg="var(--skin-{type[0]}-bg)">{type[0]}</span>
	{:else if type.length === 2}
		<span class="skew type left" style:--skin-local-bg="var(--skin-{type[0]}-bg)">
			<span class="unskew">{type[0]}</span>
		</span>
		<span class="skew type right" style:--skin-local-bg="var(--skin-{type[1]}-bg)">
			<span class="unskew">{type[1]}</span>
		</span>
	{:else}
		<span class="skew type left" style:--skin-local-bg="var(--skin-{type[0]}-bg)">
			<span class="unskew">{type[0]}</span>
		</span>
		<span class="skew type middle" style:--skin-local-bg="var(--skin-{type[1]}-bg)">
			<span class="unskew">{type[1]}</span>
		</span>
		<button on:click={toggleShowAll} aria-expanded="{showAll}" aria-controls="additional-types-expansion" aria-label="More Types" title="More Types" class="skew type right" style:--skin-local-bg="var(--skin-varies-bg)">
			<span class="unskew" style:width="1ch">{showAll ? "-" : "+"}</span>
		</button>
	{/if}
</span>
{#if type.length > 2 && showAll}
	<span id="additional-types-expansion" class="font-sm cap pad-top pad-in align-right row">
		{#each type.slice(2) as t}
			<span class="comma" style:color="var(--skin-{t}-bg)">{t}</span>
		{/each}
	</span>
{/if}

<style>
	.type-tag {
		background-color: var(--skin-local-bg);
		color: var(--skin-bg-text);
		border-radius: 1em;
		text-transform: capitalize;
		filter: var(--elev-stratus-filter);
		display: inline-block;
		overflow: hidden;
	}

	.type {
		display: inline-block;
		padding: 0.25em 1em;
		background-color: var(--skin-local-bg);
		border: none;
		color: var(--skin-bg-text);
	}

	.skew {
		display: inline-block;
		transform: skewX(var(--skew-angle));
	}

	.unskew {
		display: inline-block;
		transform: skewX(var(--skew-undo));
	}

	.left {
		margin-left: -1em;
		padding-left: 2em;
	}

	.right {
		margin-right: -1em;
		padding-right: 2em;
	}

	.font-sm {
		font-size: var(--font-sz-venus);
	}

	.pad-top {
		padding-top: 0.25em;
	}

	.pad-in {
		padding-inline: 0.5em;
	}

	.align-right {
		justify-content: flex-end;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.125em 0.25em;
		width: 100%;
		filter: brightness(1.5);
	}

	.comma::after {
		content: ',';
		color: var(--skin-bg-text);
	}

	.comma:last-child::after {
		content: '';
	}

	button {
		cursor: pointer;
	}
</style>