<script lang="ts" context="module">
	export type PathResourceUpdateDetail = {
		resource: number,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import type { ChosenTrainerPath } from "./ChosenTrainerPath"
	import { rulesVersion } from "$lib/design/rules-version"
	import { TrainerFeatureLevelLandmarks, TrainerPaths } from "."
	import { NumericResourceField, type NumericChangeDetail } from "$lib/design/forms"
	import FeatureInfo from "./FeatureInfo.svelte"

	const dispatch = createEventDispatcher()

	export let value: ChosenTrainerPath
	export let editable: boolean
	export let level: number

	$: paths = TrainerPaths[$rulesVersion] 
	$: standardPath = paths.find((it) => it.name === value.name)
	$: resource = standardPath?.resource

	const onChangeResource = (e: CustomEvent<NumericChangeDetail>) => {
		dispatch("update", {
			resource: e.detail.value,
		} as PathResourceUpdateDetail)
	}
</script>

{#if value.name !== ""}
	<section>
		<h2>Path: {value.name}</h2>
		{#if level < TrainerFeatureLevelLandmarks[0]}
			<p>You gain access to your first trainer path feature at level {TrainerFeatureLevelLandmarks[0]}.</p>
		{/if}
		{#if resource != null && level >= resource.acquiredAtLevel}
			<p class="row">
				{#if editable}
					<label for="trainer-path-resource">{resource.name}:</label>
					<span style:flex="1">
						<NumericResourceField id="trainer-path-resource" value={value.resource} on:change={onChangeResource} />
					</span>
				{:else}
					<strong>{resource.name}:</strong>
					<span style:flex="1">
						{value.resource}
					</span>
				{/if}
			</p>
		{/if}
		{#each TrainerFeatureLevelLandmarks as landmarkLevel}
			{#if level >= landmarkLevel}
				<FeatureInfo {standardPath} customPath={value} level={landmarkLevel} />
			{/if}	
		{/each}
	</section>
{/if}

<style>
	.row {
		display: flex;
		gap: 0.5em;
	}

	label {
		font-weight: bold;
	}
</style>
