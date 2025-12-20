<script lang="ts">
	import { Markdown, Paragraphs } from "$lib/ui/rendering"
	import type { ChosenFeat } from "./ChosenFeat"
	import type { Feat } from "./Feat"

	export let allFeats: Feat[]
	export let values: ChosenFeat[]
</script>

<ul>
	{#each values as feat (feat.id)}
		{@const matchingFeat = allFeats.find((it) => it.name === feat.name)}
		<li>
			<p class="no-margin"><strong>{feat.name}</strong></p>
			{#if matchingFeat != null}
				<Markdown value={matchingFeat.description} />
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