<script lang="ts">
	import type { Ability } from "./Ability"
	import { Markdown } from "$lib/ui/rendering"

	export let value: Ability[]
</script>

<ul class="known-abilities-info">
	{#each value as ability}
		<li><strong>{ability.name}</strong>: <Markdown inline value={ability.description} /></li>
	{/each}
</ul>

<style>
	.known-abilities-info {
		list-style: none;
		padding: 0;
		font-size: var(--font-sz-venus);
	} .known-abilities-info li {
		display: block;
		margin-block-end: 0.75em;
	}
</style>
