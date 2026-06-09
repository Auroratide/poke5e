<script lang="ts">
	import { rulesVersion } from "$lib/site/rules-version";
	import { TrainerPaths } from "$lib/trainers/paths";
	import { Fieldset, InstructionText, SelectField } from "$lib/ui/forms";
	import { renderHtml } from "$lib/ui/rendering";
	import type { NewTrainerPathEffect } from "./NewTrainerPath";

	let {
		value,
	}: {
		value: NewTrainerPathEffect,
	} = $props()

	let possiblePaths = $derived(TrainerPaths[$rulesVersion])
	let pathOptions = $derived(possiblePaths.map((path) => ({
		value: path.name,
		name: path.name,
	})).concat([{
		value: "CUSTOM",
		name: "- Custom -",
	}]))
	let chosenPathValue = $derived(possiblePaths[0].name)
	let chosenPath = $derived(possiblePaths.find((path) => path.name === chosenPathValue))

	$effect(() => {
		value.params = {
			path: chosenPath,
		}
	})
</script>

<Fieldset title="Trainer Path">
	<InstructionText>Average for hit dice is filled in automatically. Tap "Roll" to put yourself in fate's hands! Your constitution bonus is added in for you.</InstructionText>
	<SelectField label="Trainer Path" options={pathOptions} bind:value={chosenPathValue} />
	{#if chosenPath}
		<div class="description">
			{@html renderHtml(chosenPath.features.level2.description)}
			<h3>{chosenPath.features.level5.name}</h3>
			{@html renderHtml(chosenPath.features.level5.description)}
			<h3>{chosenPath.features.level9.name}</h3>
			{@html renderHtml(chosenPath.features.level9.description)}
			<h3>{chosenPath.features.level15.name}</h3>
			{@html renderHtml(chosenPath.features.level15.description)}
		</div>
	{:else}
		<InstructionText>After completing your level up, you can define the custom path's features by editing your trainer.</InstructionText>
	{/if}
</Fieldset>

<style>
	.description {
		font-size: var(--font-sz-venus);
		line-height: 1.4;
	}

	.description h3 {
		font-weight: bold;
		font-size: var(--font-sz-earth);
		margin-block: 0.25em;
	}
</style>
