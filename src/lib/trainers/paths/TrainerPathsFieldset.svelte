<script lang="ts">
	import { TrainerPaths } from "./2024"
	import { Fieldset, SelectField, SelectFieldOther } from "$lib/ui/forms"
	import PathFeatureFields from "./PathFeatureFields.svelte"
	import type { ChosenTrainerPath } from "./ChosenTrainerPath"
	import { isStandardTrainerPath } from "./TrainerPath"
	import { m } from "$lib/site/i18n"

	export let value: ChosenTrainerPath
	export let disabled: boolean = false

	let path = value.name === "" || isStandardTrainerPath(value.name) ? value.name : SelectFieldOther
	let pathCustom = value.name

	$: {
		if (path === SelectFieldOther) {
			value.name = pathCustom
		} else {
			value.name = path
		}
	}

	const options = [ {
		name: "— None —",
		value: "",
	} ].concat(TrainerPaths.map((path) => ({
		name: path.name,
		value: path.name,
	})))
</script>

<Fieldset title="{m["universal.trainerPath"]()}">
	<SelectField label="{m["universal.pathName"]()}" {options} bind:value={path} bind:other={pathCustom} {disabled} />
	{#if path === SelectFieldOther}
		<hr />
		<PathFeatureFields level="2" bind:description={value.customFeatures.level2.description} {disabled} />
		<PathFeatureFields level="5" bind:name={value.customFeatures.level5.name} bind:description={value.customFeatures.level5.description} {disabled} />
		<PathFeatureFields level="9" bind:name={value.customFeatures.level9.name} bind:description={value.customFeatures.level9.description} {disabled} />
		<PathFeatureFields level="15" bind:name={value.customFeatures.level15.name} bind:description={value.customFeatures.level15.description} {disabled} />
	{/if}
</Fieldset>
