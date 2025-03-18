<script lang="ts">
	export let label: string
</script>

<table>
	<caption>{label}</caption>
	<slot></slot>
</table>

<style>
	table {
		border-collapse: collapse;
		margin: 0 auto 1em;
		font-size: var(--font-sz-venus);
	}
	
	table :global(th) {
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
		border-bottom: 0.125em solid var(--skin-bg-text);
		text-align: start;
	}

	table :global(tbody tr:nth-child(odd) td) {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	table :global(tr:nth-child(even) td) {
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
	}

	table :global(th), table :global(td) {
		padding: 0.5em 0.5em;
	}

	caption {
		caption-side: bottom;
		padding: 0.5em;
		font-weight: bold;
	}
</style>
