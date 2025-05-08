<script lang="ts">
	import type { Specialization } from "./specializations"
	import TypeTag from "$lib/pokemon/TypeTag.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte";

	export let specializations: Map<Specialization, number>

	$: nonzeroSpecializations = specializations.entries().filter((it) => it[1] > 0)
</script>

<ul>
	{#each nonzeroSpecializations as specialization}
		<li><TypeTag type={[specialization[0].type]} /> &times;{specialization[1]}</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		font-size: var(--font-sz-venus);
		column-count: 2;
	} li {
		display: flex;
		align-items: center;
		gap: 0.25em;
	} li :global(.type-tag) {
		font-size: var(--font-sz-venus);
	}
</style>