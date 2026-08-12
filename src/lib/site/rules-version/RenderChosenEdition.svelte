<script lang="ts" generics="T">
	import type { Snippet } from "svelte"
	import { Editions, type RulesVersion } from "./RulesVersion"

	let {
		values,
		render,
	}: {
		values: Record<RulesVersion, T>,
		render: Snippet<[T]>,
	} = $props()
</script>

{#each Editions as edition}
	<div data-edition-content={edition}>
		{@render render(values[edition])}
	</div>
{/each}
