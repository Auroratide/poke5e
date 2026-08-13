<script lang="ts">
	import { ExternalIcon } from "$lib/ui/icons"
	import { StaticPage, Title } from "$lib/ui/layout"
	import { Resources } from "./Resource"
	import ResourceCard from "./ResourceCard.svelte"
</script>

<Title value="Resources" />
<StaticPage title="Resources" subtitle="This is a list of tools, documents, and supplements shared by members of the Pokémon 5e community!" theme="orange">
	{#snippet icon()}
		<ExternalIcon />
	{/snippet}
	<div class="cards">
		{#each Resources as resource}
			<ResourceCard value={resource} />
		{/each}
	</div>

</StaticPage>

<style>
	.cards {
		display: flex;
		flex-direction: column;
		gap: 2em;
		block-size: 100%;
		inline-size: 100%;
	}
</style>
