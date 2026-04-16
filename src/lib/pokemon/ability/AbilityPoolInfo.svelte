<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Loader } from "$lib/ui/elements"
	import { Tag } from "$lib/ui/elements"
	import { AbilityStore } from "./AbilityStore"
	import { AbilityPool } from "./AbilityPool"

	export let value: AbilityPool
</script>

{#if $AbilityStore == null || $AbilityStore?.length === 0}
	<div class="smaller">
		<Loader caption="Finding abilities..." />
	</div>
{:else}
	{#each value.data.normal as id}
		{@const ability = $AbilityStore?.find((it) => id === it.referenceId)}
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
	{#each value.data.hidden as id}
		{@const ability = $AbilityStore?.find((it) => id === it.referenceId)}
		<p class="no-margin"><Tag>{m.hidden()}</Tag></p>
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
{/if}

<style>
	.no-margin { margin: 0; }
	p { font-size: var(--font-sz-venus); }
	.smaller { font-size: var(--font-sz-mars); }
</style>