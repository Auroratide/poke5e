<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children?: Snippet
	} = $props()
</script>

<span class="error-inline">{@render children?.()}</span>

<style>
	.error-inline {
		font-weight: bold;
		color: var(--skin-danger-text);
	}
</style>
