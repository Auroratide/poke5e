<script lang="ts">
	import type { Level } from "$lib/dnd/level"
	import { rulesVersion } from "$lib/site/rules-version"
	import { Paragraphs, renderHtml } from "$lib/ui/rendering"
	import { isFeatureLandmarkLevel, TrainerPaths } from "."
	import type { ChosenTrainerPath } from "./ChosenTrainerPath"

	let {
		path,
		level,
	}: {
		path: ChosenTrainerPath,
		level: Level,
	} = $props()

	const standardPaths = $derived(TrainerPaths[$rulesVersion])
	const standardPath = $derived(standardPaths.find((it) => it.name === path.name))
	const levelKey = $derived(`level${level.data}` as keyof ChosenTrainerPath["customFeatures"])
</script>

{#if isFeatureLandmarkLevel(level.data)}	
	{#if standardPath != null && "name" in standardPath.features[levelKey]}
		<h3>{standardPath?.features[levelKey].name}</h3>
	{:else if "name" in path.customFeatures[levelKey]}
		<h3>{path.customFeatures[levelKey].name}</h3>
	{/if}
	<div class="smaller">
		{#if standardPath != null}
			{@html renderHtml(standardPath.features[levelKey].description)}
		{:else}
			<Paragraphs value={path.customFeatures[levelKey].description} />
		{/if}
	</div>
{:else}
	<p>No path feature found at level {level.data}.</p>
{/if}

<style>
	.smaller {
		font-size: var(--font-sz-venus);
	}
</style>
