<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { slide } from "svelte/transition"
	import VisuallyHidden from "../elements/VisuallyHidden.svelte"
	import { FilterIcon } from "$lib/ui/icons";

	export let id: string
	export let label: string
	export let value: string
	export let matched: number
	export let max: number
	export let activeFilters: number

	let showFilter = false
	$: filterId = `${id}-filter-options`
	const toggleFilter = () => showFilter = !showFilter
	const closeFilter = () => {
		showFilter = false
	}
</script>

<search class="search-field">
	<div class="skew-container">
		<div class="search-bar">
			<span class="filter"><button class="filter-button" type="button" aria-expanded="{showFilter}" aria-controls="{filterId}" aria-label="Filter Options" title="Filter Options" on:click={toggleFilter}>
				<span class="filter-icon">
					<FilterIcon />
				</span>
				{#if activeFilters > 0}
					<span class="active-filters">{activeFilters}</span>
				{/if}
			</button></span>
			<VisuallyHidden><label for={id}>{label}</label></VisuallyHidden>
			<input {id} type="search" placeholder="{m["universal.search"]()}..." bind:value />
			<VisuallyHidden><label for="results-{id}">Number of results</label></VisuallyHidden>
			<span class="matched"><output id="results-{id}" class="text" aria-live="polite">{matched} / {max}</output></span>
		</div>
	</div>
	{#if showFilter}
		<form on:submit|preventDefault={closeFilter} class="filter-options" transition:slide={{ duration: 200 }}>
			<div class="invert-colors two-columns">
				<slot></slot>
			</div>
		</form>
	{/if}
</search>

<style>
	.skew-container {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		transform: skewX(var(--skew-angle));
		padding-left: 1em;
		margin-inline: -1em;
	}

	@media screen and (min-width: 37.5rem) {
		.skew-container {
			margin-inline: 0;
		}
	}

	.search-bar {
		transform: skewX(var(--skew-undo));
		display: flex;
	}

	.search-bar input {
		inline-size: 0;
		flex: 1;
		background: none;
		border: none;
		color: var(--skin-bg-text);
		padding: 0.25em 0.75em;
	}

	.filter {
		display: flex;
		align-items: center;
		background-color: var(--skin-bg-dark);
		transform: skewX(var(--skew-angle));
		margin-inline-start: -1em;
	}

	.matched {
		display: flex;
		align-items: center;
		background-color: var(--skin-bg-dark);
		transform: skewX(var(--skew-angle));
		padding: 0 1em;
		margin-left: 0.5em;
		color: var(--skin-bg-softtext);
		white-space: nowrap;
	}

	.matched .text {
		transform: skewX(var(--skew-undo));
	}

	.filter-button {
		all: unset;
		position: relative;
		font-size: 1em;
		color: var(--skin-bg-text);
		cursor: pointer;
		padding: 0.25em 1em;
		display: flex;
		align-items: center;
	}

	.filter-icon {
		display: inline-block;
		inline-size: 1em;
		block-size: 1em;
		transform: skewX(var(--skew-undo));
	}

	.filter-options {
		background: var(--skin-bg);
		padding: 0.75em;
		margin-block-start: 0.5em;
	}

	.invert-colors {
		filter: invert();
	}

	.active-filters {
		font-size: 0.5em;
		position: absolute;
		inset: auto 0.125em 0.125em auto;
		background: var(--skin-focus);
		color: var(--skin-bg-text);
		inline-size: 1.25em;
		block-size: 1.25em;
		border-radius: 1em;
		padding: 0.125em;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		box-shadow: var(--elev-cumulus);
		transform: skewX(var(--skew-undo));
	}

	.two-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5em;
	}
</style>