<script lang="ts">
	import { StaticPage, Title } from "$lib/ui/layout"
	import type { PageData } from "./$types"
	import CommonSchemasCard from "./CommonSchemasCard.svelte"
	import SrdResourceCard from "./SrdResourceCard.svelte"

	let {
		data,
	}: {
		data: PageData,
	} = $props()

	const specification = $derived(data.specification)
</script>

<Title value="Pokémon 5e SRD" />
<StaticPage title="Pokémon 5e SRD" subtitle="Public API for Pokémon 5e system and rules data">
	<div class="resource-list">
		{#each specification.tags ?? [] as tag}
			<SrdResourceCard {specification} tag={tag.name} />
		{/each}
		<CommonSchemasCard {specification} />
	</div>
</StaticPage>

<style>
	.resource-list {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
</style>
