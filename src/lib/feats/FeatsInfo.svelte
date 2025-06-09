<script lang="ts">
	import { renderMarkdown } from "$lib/rendering/markdown"
	import type { ChosenFeat } from "./ChosenFeat"
	import { AllFeats } from "./AllFeats"
	import Paragraphs from "$lib/design/Paragraphs.svelte"

	export let values: ChosenFeat[]
</script>

<ul>
	{#each values as feat (feat.id)}
		{@const matchingFeat = $AllFeats.find((it) => it.name === feat.name)}
		<li>
			<p class="no-margin"><strong>{feat.name}</strong></p>
			{#if matchingFeat != null}
				{@html renderMarkdown(matchingFeat.description)}
			{/if}
			{#if feat.description.trim()}
				<Paragraphs value={feat.description} />
			{/if}
			{#if matchingFeat == null && !feat.description.trim()}
				<p>No description provided.</p>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		font-size: var(--font-sz-venus);
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5em;
	}

	li :global(p:last-child) {
		margin-block-end: 0;
	}

	.no-margin { margin: 0; }
</style>