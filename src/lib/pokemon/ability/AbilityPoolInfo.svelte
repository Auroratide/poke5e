<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { ErrorInline, Loader } from "$lib/ui/elements"
	import { Tag } from "$lib/ui/elements"
	import { AbilityStore } from "./AbilityStore"
	import { AbilityPool } from "./AbilityPool"
	import { Markdown } from "$lib/ui/rendering"

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
		<div class="ability"><strong>{ability.name}:</strong> <Markdown inline value={ability.description} /></div>
	{/each}
	{#each value.data.hidden as ability}
		<p class="no-margin"><Tag>{m.hidden()}</Tag></p>
		<div class="ability"><strong>{ability.name}:</strong> <Markdown inline value={ability.description} /></div>
	{/each}
{/if}

<style>
	.no-margin { margin: 0; }
	p { font-size: var(--font-sz-venus); }

	.ability {
		font-size: var(--font-sz-venus);
		margin-block: 1em;
	}

	.smaller { font-size: var(--font-sz-mars); }
</style>