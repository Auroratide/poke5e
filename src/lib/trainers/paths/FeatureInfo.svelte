<script lang="ts">
	import { renderHtml, Paragraphs } from "$lib/ui/rendering"
	import type { ChosenTrainerPath } from "./ChosenTrainerPath"
	import { type TrainerPath, type TrainerFeatureLevelLandmark, TrainerFeatureLevelLandmarks } from "./TrainerPath"

	export let standardPath: TrainerPath | undefined
	export let customPath: ChosenTrainerPath
	export let level: TrainerFeatureLevelLandmark

	$: key = `level${level}`
</script>

{#if level !== TrainerFeatureLevelLandmarks[0]}
	<h3>{standardPath?.features[key].name ?? customPath.customFeatures[key].name}</h3>
{/if}
<div class="smaller">
	{#if standardPath != null}
		{@html renderHtml(standardPath.features[key].description)}
	{:else}
		<Paragraphs value={customPath.customFeatures[key].description} />
	{/if}
</div>

<style>
	.smaller {
		font-size: var(--font-sz-venus);
	}
</style>
