<script lang="ts">
	import type { Attribute } from "$lib/dnd/attributes"
	import type { Skill } from "$lib/dnd/skills"
	import { m } from "$lib/site/i18n"
	import { specializationDescription, SpecializationList } from "$lib/trainers/specializations"
	import { Fieldset, InstructionText, SelectField } from "$lib/ui/forms"
	import RadioFields from "$lib/ui/forms/RadioFields.svelte"
	import { capitalize, uppercase } from "$lib/utils/string"
	import type { AdditionalSpecializationEffect } from "./AdditionalSpecialization"

	let {
		value,
	}: {
		value: AdditionalSpecializationEffect,
	} = $props()

	let specializationList = $derived(Object.values($SpecializationList).toSorted((a, b) => a.type.localeCompare(b.type)))
	const specializationOptions = $derived(specializationList.map((it) => ({
		value: it.id,
		name: `${it.type}: ${it.name}`,
	})))

	let lastChosenSpecializationId = $state<string | undefined>(undefined)
	let chosenSpecializationId = $derived(specializationList[0].id)
	let chosenSpecialization = $derived(specializationList.find((it) => it.id === chosenSpecializationId))

	let possibleAsi = $derived(chosenSpecialization?.effect.find((it) => it.type === "asi")?.value ?? [])
	let chosenAsi = $state<Attribute | undefined>(undefined)

	let possibleSkills = $derived(chosenSpecialization?.effect.find((it) => it.type === "proficiency")?.value ?? [])
	let chosenSkill = $state<Skill | undefined>(undefined)


	$effect(() => {
		// reset the chosen asi and skill if a new specialization is chosen
		if (lastChosenSpecializationId !== chosenSpecializationId) {
			chosenAsi = undefined
			chosenSkill = undefined
			lastChosenSpecializationId = chosenSpecializationId
		}
	})

	$effect(() => {
		value.params = {
			specialization: chosenSpecialization,
			asi: chosenAsi,
			skill: chosenSkill,
		}
	})
</script>

<Fieldset title={m.chooseSpecialization()}>
	<InstructionText>{m.chooseSpecializationInstructions()}</InstructionText>
	<SelectField label={m.specializations()} options={specializationOptions} bind:value={chosenSpecializationId} />
	{#if chosenSpecialization}
		<div class="description">
			<p style:margin-block="0">{specializationDescription(chosenSpecialization)}</p>
		</div>
	{/if}
	{#if possibleAsi.length > 1}
		<h3><strong>{m.chooseAnAsi()}:</strong></h3>
		<div class="additional-choices">
			<RadioFields label="Choose ASI" values={possibleAsi.map((it) => ({ value: it, name: uppercase(it)}))} bind:checked={chosenAsi} />
		</div>
	{/if}
	{#if possibleSkills.length > 1}
		<h3><strong>{m.chooseAProficiency()}:</strong></h3>
		<div class="additional-choices">
			<RadioFields label="Choose Proficiency" values={possibleSkills.map((it) => ({ value: it, name: capitalize(it)}))} bind:checked={chosenSkill} />
		</div>
	{/if}
</Fieldset>

<style>
	.description {
		font-size: var(--font-sz-venus);
		line-height: 1.4;
	}

	.additional-choices {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5em;
	}

	h3 {
		margin-block-start: 0;
		font-size: var(--font-sz-earth);
	}
</style>
