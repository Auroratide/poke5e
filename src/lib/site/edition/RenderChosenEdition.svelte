<script lang="ts" generics="T">
	import type { Snippet } from "svelte"
	import { Editions, type Edition } from "./Edition"

	let {
		values,
		render,
	}: {
		values: Record<Edition, T>,
		render: Snippet<[T]>,
	} = $props()
</script>

{#each Editions as edition}
	<div data-edition-content={edition}>
		{@render render(values[edition])}
	</div>
{/each}
