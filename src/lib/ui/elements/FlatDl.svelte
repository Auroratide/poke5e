<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		columns = 1,
		gap = "0.0625em",
		children,
	}: {
		columns?: number,
		gap?: string,
		children?: Snippet,
	} = $props()
</script>

<dl style:--local-columns="{columns}" style:--row-gap={gap}>
	{@render children?.()}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(var(--local-columns), auto 1fr);
		column-gap: 0.5em;
		row-gap: var(--row-gap);
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