<script lang="ts">
	export let columns = 1
</script>

<dl style:--local-columns="{columns}">
	<slot></slot>
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(var(--local-columns), auto 1fr);
		column-gap: 0.5em;
		font-size: var(--font-sz-venus);
		line-height: 1.25;
	}

	dl :global(dt) {
		font-weight: 700;
	}

	dl :global(dt:not(:empty)::after) {
		content: ':';
	}

	dl :global(dd) {
		margin: 0;
	}
</style>