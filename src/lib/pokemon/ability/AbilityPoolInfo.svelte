<script lang="ts">
	import { Loader } from "$lib/ui/elements"
	import { Tag } from "$lib/ui/elements"
	import { abilities } from "../store"
	import { AbilityPool } from "./AbilityPool"

	export let value: AbilityPool
</script>

{#if $abilities == null || $abilities?.length === 0}
	<div class="smaller">
		<Loader caption="Finding abilities..." />
	</div>
{:else}
	{#each value.data.normal as id}
		{@const ability = $abilities?.find((it) => id === it.id)}
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
	{#each value.data.hidden as id}
		{@const ability = $abilities?.find((it) => id === it.id)}
		<p class="no-margin"><Tag>Hidden</Tag></p>
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
{/if}

<style>
	.no-margin { margin: 0; }
	p { font-size: var(--font-sz-venus); }
	.smaller { font-size: var(--font-sz-mars); }
</style>