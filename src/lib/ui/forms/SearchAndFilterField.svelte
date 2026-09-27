<script lang="ts">
	import { FilterIcon } from "$lib/ui/icons"

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let placeholder: string | undefined = undefined
	export let disabled: boolean = false

	export let matches: number
	export let activeFilters: number

	$: kebabName = name ?? label.toLocaleLowerCase().replaceAll(/\s/g, "-")

	let showFilter = false
	$: filterId = `${kebabName}-filter-options`
	const toggleFilter = () => showFilter = !showFilter

	const preventDefault = (e: Event) => e.preventDefault()
</script>

<div class="search-and-filter-field">
	<div class="input-group">
		<label for="{kebabName}">{label}</label>
		<div class="buttoned-input">
			<input type="text" id="{kebabName}" name="{kebabName}" {placeholder} bind:value {disabled} on:submit={preventDefault} />
			<button class="filter-button" type="button" aria-expanded="{showFilter}" aria-controls="{filterId}" aria-label="Filter Options" title="Filter Options" on:click={toggleFilter}>
				<span class="filter-icon">
					<FilterIcon />
				</span>
				{#if activeFilters > 0}
					<span class="active-filters">{activeFilters}</span>
				{/if}
			</button>
		</div>
	</div>
	<div id="{filterId}" class="filter-group" hidden={!showFilter} aria-hidden="{!showFilter}" inert={!showFilter}>
		<slot></slot>
	</div>
	<div class="output-group" class:hide={value.length === 0}>
		<output id="ability-filter-matches" for="ability-filter">
			{matches > 0 ? matches : "No"}
		</output>
		<label for="ability-filter-matches">
			{matches === 1 ? "match" : "matches"}
		</label>
	</div>
</div>

<style>
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	.input-group label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	.buttoned-input {
		display: flex;
		align-items: center;
		inline-size: 100%;
		background: var(--skin-input-bg);
	}

	input {
		background: transparent;
		flex: 1;
	}

	.output-group {
		text-align: center;
		padding-block: 0.5em 1em;
		font-size: var(--font-sz-venus);
		font-style: italic;
	}

	.hide { visibility: hidden; }

	.filter-button {
		all: unset;
		position: relative;
		font-size: 1.5em;
		color: var(--skin-content-text);
		cursor: pointer;
		padding: 0.25em 0.25em;
		display: flex;
		align-items: center;
		background: var(--skin-input-bg);
		border-inline-start: 0.125em solid var(--skin-content);
	} .filter-button:hover, .filter-button:focus {
		box-shadow: 0 0 0 1em oklch(0% 0 0 / 0.15) inset;
	} .filter-button[aria-expanded="true"] {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	.filter-group {
		border-inline-start: 0.25em solid var(--skin-input-bg);
		border-block-end: 0.25em solid var(--skin-input-bg);
		padding-block: 0.75em;
		padding-inline-start: 0.75em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	} .filter-group[hidden] {
		display: none;
	}

	.filter-icon {
		display: inline-block;
		inline-size: 1em;
		block-size: 1em;
	}

	@supports (interpolate-size: allow-keywords) {
		.filter-group {
			height: auto;
			transition: all 0.25s ease-in-out;
			overflow: hidden;
		} .filter-group[hidden] {
			display: flex;
			margin-block-start: 0;
			height: 0;
			padding-block: 0;
			border-block-width: 0;
		}
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
	}
</style>
