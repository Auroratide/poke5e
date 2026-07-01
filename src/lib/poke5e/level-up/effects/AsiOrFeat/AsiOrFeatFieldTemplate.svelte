<script lang="ts">
	import { AbilityScoreImprovement, AsiField } from "$lib/dnd/attributes"
	import { m } from "$lib/site/i18n"
	import { Tag } from "$lib/ui/elements"
	import { Fieldset, InstructionText, SelectField, TextareaField, TextField } from "$lib/ui/forms"
	import { type AsiOrFeatEffect } from "./AsiOrFeat"

	let {
		value,
		name,
		instructions,
	}: {
		name: string,
		instructions: (pointsToSpend: number) => string,
		value: AsiOrFeatEffect,
	} = $props()

	const ASI_OPTION = {
		value: "asi",
		name: "Ability Score Improvement",
	}

	const CUSTOM_OPTION = {
		value: "CUSTOM",
		name: `- ${m.custom()} -`,
	}

	const options = $derived([ASI_OPTION].concat(value.props.options.map((it) => ({
		value: it.name,
		name: it.name,
	}))).concat([CUSTOM_OPTION]))

	let lastChosenValue = $derived(options[0].value)
	let chosenOptionValue = $derived(options[0].value)
	let chosenFeat = $derived(value.props.options.find((it) => it.name === chosenOptionValue))

	let customFeatName = $state("")
	let customFeatDescription = $state("")

	let pointsSpent = $state(AbilityScoreImprovement.zero())

	$effect(() => {
		if (chosenOptionValue !== lastChosenValue) {
			pointsSpent = AbilityScoreImprovement.zero()
			lastChosenValue = chosenOptionValue
		}
	})

	$effect(() => {
		value.params = {
			feat: chosenFeat != null ? {
				id: "",
				name: chosenFeat.name,
				description: "",
				isCustom: false,
			} : chosenOptionValue === CUSTOM_OPTION.value ? {
				id: "",
				name: customFeatName,
				description: customFeatDescription,
				isCustom: true,
			} : undefined,
			pointsSpent: pointsSpent,
		}
	})
</script>

<Fieldset title={name}>
	<InstructionText>{instructions(value.props.pointsToSpend)}</InstructionText>
	<SelectField label={m.asiOrFeat()} options={options} bind:value={chosenOptionValue} />
	{#if chosenOptionValue === ASI_OPTION.value}
		<AsiField attributes={value.props.attributes} pointsToSpend={value.props.pointsToSpend} bind:pointsSpent />
	{/if}
	{#if chosenFeat != null}
		<div class="description">
			<p>{chosenFeat.description}</p>
			<p><Tag>{m.note()}!</Tag> {m.asiFeatQualifier()}</p>
		</div>
		<AsiField attributes={value.props.attributes} pointsToSpend={1} bind:pointsSpent />
	{/if}
	{#if chosenOptionValue === CUSTOM_OPTION.value}
		<TextField label={m.name()} bind:value={customFeatName} />
		<TextareaField label={m.description()} bind:value={customFeatDescription} />
		<p class="description"><Tag>{m.note()}!</Tag> {m.asiFeatQualifier()}</p>
		<AsiField attributes={value.props.attributes} pointsToSpend={1} bind:pointsSpent />
	{/if}
</Fieldset>

<style>
	.description {
		font-size: var(--font-sz-venus);
		line-height: 1.4;
	}
</style>
