<script lang="ts">
	export let mainBg = ""
	export let interactive = false
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<tr role="row" class:interactive style:--skin-local-bg={mainBg}>
	<slot></slot>
</tr>

<style>
	tr {
		position: relative;
		border-radius: 1em;
		box-shadow: var(--elev-cumulus);
	}

	tr :global(td) {
		background: var(--skin-content);
		color: var(--skin-content-text);
	}

	tr :global(td:first-child) {
		border-top-left-radius: 1em;
		border-bottom-left-radius: 1em;
	}

	tr :global(td:last-child) {
		border-top-right-radius: 1em;
		border-bottom-right-radius: 1em;
	}

	tr :global(.primary) {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	tr.interactive :global(a) {
		color: var(--skin-bg-text);
		text-decoration: none;
	}

	tr.interactive :global(a::before) {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	tr.interactive:hover :global(td) {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	tr.interactive:hover :global(td.primary) {
		background: var(--skin-local-bg);
	}
</style>
