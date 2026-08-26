<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { ErrorInline, Loader } from "$lib/ui/elements"
	import { Tag } from "$lib/ui/elements"
	import { AbilityStore } from "./AbilityStore"
	import { AbilityPool } from "./AbilityPool"

	export let value: AbilityPool
</script>

{#if $AbilityStore.fetching}
	<div class="smaller">
		<Loader caption="Finding abilities..." />
	</div>
{:else if $AbilityStore.error}
	<p><ErrorInline>Could not load abilities.</ErrorInline></p>
{:else}
	{#each value.data.normal as ability}
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
	{#each value.data.hidden as ability}
		<p class="no-margin"><Tag>{m.hidden()}</Tag></p>
		<p><strong>{ability.name}:</strong> {ability.description}</p>	
	{/each}
{/if}

<style>
	.no-margin { margin: 0; }
	p { font-size: var(--font-sz-venus); }
	.smaller { font-size: var(--font-sz-mars); }
</style>