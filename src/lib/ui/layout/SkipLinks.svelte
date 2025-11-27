<script lang="ts" context="module">
	export const MAIN_CONTENT_ID = "main-content"
	export const MAIN_SEARCH_ID = "main-search"
</script>

<script lang="ts">
	export let content: boolean = false
	export let search: boolean = false
</script>

<aside aria-label="Skip Links">
	<ul>
		{#if content}<li><a href="#{MAIN_CONTENT_ID}">Skip to Content</a></li>{/if}
		{#if search}<li><a href="#{MAIN_SEARCH_ID}">Skip to Search</a></li>{/if}
	</ul>
</aside>

<style>
	aside {
		position: fixed;
		inset: 2.5em 0 0 1em;
		inline-size: 28rem;
		max-inline-size: calc(95vw - 0.5em);
		block-size: fit-content;
		border: 0.125rem solid var(--skin-bg);
		border-inline-start: 1.5rem solid var(--skin-bg);
		background: var(--skin-bg-text);
		padding: 1em;
		box-shadow: var(--elev-cirrus);
		z-index: 9;

		pointer-events: none;
		opacity: 0;
		inset-inline-start: 0;
		transition: opacity 0.25s ease-out, inset-inline-start 0.25s ease-out;
	}

	aside:focus-within {
		pointer-events: all;
		opacity: 1;
		inset-inline-start: 1em;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
