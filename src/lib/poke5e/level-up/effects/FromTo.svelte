<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		from,
		to,
	}: {
		from: string | Snippet,
		to: string | Snippet,
	} = $props()
</script>

<span class="from-to">
	<span>
		{#if typeof from === "string"}
			{from}
		{:else}
			{@render from()}
		{/if}
	</span>
	<span>→</span>
	<span>
		{#if typeof to === "string"}
			{to}
		{:else}
			{@render to()}
		{/if}
	</span>
</span>

<style>
	.from-to {
		display: inline-flex;
		gap: 0.75em;
		flex-wrap: wrap;
		align-items: center;
	}
</style>