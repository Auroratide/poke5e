<script lang="ts">
	import VisuallyHidden from "./VisuallyHidden.svelte"

	export let id: string
	export let label: string
	export let value: string
	export let matched: number
	export let max: number
</script>

<div class="skew-container">
	<search class="search-field">
		<VisuallyHidden><label for={id}>{label}</label></VisuallyHidden>
		<input {id} type="search" placeholder="Search..." bind:value />
		<VisuallyHidden><label for="results-{id}">Number of results</label></VisuallyHidden>
		<span class="matched"><output id="results-{id}" class="text" aria-live="polite">{matched} / {max}</output></span>
	</search>
</div>

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

	.search-field {
		transform: skewX(var(--skew-undo));
		display: flex;
	}

	.search-field input {
		inline-size: 0;
		flex: 1;
		background: none;
		border: none;
		color: var(--skin-bg-text);
		padding: 0.25em 0.5em;
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
</style>