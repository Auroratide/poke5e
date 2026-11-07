<script lang="ts">
	import type { Ability } from "./Ability"
	import AbilityDescription from "./AbilityDescription.svelte"

	export let value: Ability[]
</script>

<ul class="known-abilities-info">
	{#each value as ability}
		<li><strong>{ability.name}</strong>: <AbilityDescription value={ability} /></li>
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
