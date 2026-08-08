<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		id,
		level,
		children,
	}: {
		/**
		 * Note: id should be stable across languages and time
		 */
		id: string,
		level: "1" | "2" | "3" | "4" | "5" | "6",
		children?: Snippet,
	} = $props()

	const h = $derived(`h${level}`)
</script>

<svelte:element {id} this={h}>
	<a href="#{id}">{@render children?.()}</a>
</svelte:element>

<style>
	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover, a:focus {
		text-decoration: underline;
	}
</style>
