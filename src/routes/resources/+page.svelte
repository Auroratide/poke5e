<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { ExternalIcon } from "$lib/ui/icons"
	import { StaticPage, Title } from "$lib/ui/layout"
	import { Resources } from "./Resource"
	import ResourceCard from "./ResourceCard.svelte"
</script>

<Title value="{m.resources()}" />
<StaticPage title="{m.resources()}" subtitle="{m.resourcesDescription()}" theme="orange">
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
