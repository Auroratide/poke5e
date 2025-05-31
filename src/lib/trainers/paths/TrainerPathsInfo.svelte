<script lang="ts">
	import type { ChosenTrainerPath } from "./ChosenTrainerPath"
	import { rulesVersion } from "$lib/design/rules-version"
	import { TrainerFeatureLevelLandmarks, TrainerPaths } from "."
	import FeatureInfo from "./FeatureInfo.svelte"

	export let value: ChosenTrainerPath
	export let level: number

	$: paths = TrainerPaths[$rulesVersion] 
	$: standardPath = paths.find((it) => it.name === value.name)
</script>

{#if value.name !== ""}
	<section>
		<h2>Path: {value.name}</h2>
		{#if level < TrainerFeatureLevelLandmarks[0]}
			<p>You gain access to your first trainer path feature at level {TrainerFeatureLevelLandmarks[0]}.</p>
		{/if}
		{#each TrainerFeatureLevelLandmarks as landmarkLevel}
			{#if level >= landmarkLevel}
				<FeatureInfo {standardPath} customPath={value} level={landmarkLevel} />
			{/if}	
		{/each}
	</section>
{/if}
