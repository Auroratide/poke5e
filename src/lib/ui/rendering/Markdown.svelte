<script lang="ts">
	import { renderMarkdown, type MarkdownString } from "./markdown"

	export let value: MarkdownString
</script>

<div class="markdown">
	{@html renderMarkdown(value)}
</div>

<style>
	.markdown {
		display: contents;
	}

	.markdown :global(table) {
		border-collapse: collapse;
		margin: 0 auto 1em;
		font-size: var(--font-sz-venus);
	}
		
	.markdown :global(table th) {
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
		border-bottom: 0.125em solid var(--skin-bg-text);
		text-align: start;
	}

	.markdown :global(table tbody th) {
		border-bottom: none;
	}

	.markdown :global(table tbody tr:nth-child(odd) td) {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	.markdown :global(table tr:nth-child(even) td) {
		background-color: var(--skin-bg-dark);
		color: var(--skin-bg-text);
	}

	.markdown :global(table th), .markdown :global(table td) {
		padding: 0.5em 0.5em;
	}

	.markdown :global(table th p:last-child), .markdown :global(table td p:last-child) {
		margin-block-end: 0;
	}

	.markdown :global(table a) {
		color: var(--skin-bg-text);
		text-decoration: underline;
	} .markdown :global(table a:hover), .markdown :global(table a:focus) {
		text-decoration: none;
	}

	.markdown :global(table caption) {
		caption-side: bottom;
		padding: 0.5em;
		font-weight: bold;
	}

	.markdown :global(.nowrap) {
		white-space: nowrap;
	}
</style>
