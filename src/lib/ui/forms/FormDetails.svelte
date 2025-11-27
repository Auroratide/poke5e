<script lang="ts">
	export let title: string
</script>

<details>
	<summary><h2>{title}</h2></summary>
	<slot></slot>
</details>

<style>
	summary {
		background-color: var(--skin-input-bg);
		margin-inline: 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
		display: flex;
		font-size: var(--font-sz-earth);
		overflow: hidden;
		margin-bottom: 1em;
	}

	summary::marker,
	summary::-webkit-details-marker {
		display: none;
	}

	summary::before {
		content: '+';
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		display: inline-block;
		min-width: calc(1ch + 1em);
		padding: 0.25em 0.5em;
		text-align: center;
	}

	h2::before {
		content: 'Show ';
	}

	details[open] h2::before {
		content: 'Hide ';
	}

	details[open] summary::before {
		content: '-';
	}

	h2 {
		font-size: 1em;
		padding: 0.25em 0.75em;
	}
</style>
