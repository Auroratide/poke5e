<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children?: Snippet
	} = $props()
</script>

<p class="center-stage">{@render children?.()}</p>

<style>
	.center-stage {
		font-size: var(--font-sz-neptune);
		text-align: center;
		font-weight: bold;
		margin-block: 1.5em;
	}
</style>