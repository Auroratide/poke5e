<script lang="ts">
	import { m } from "$lib/site/i18n";
	import { Fieldset, DoubleCheckboxFields, type DoubleCheckboxFieldsChangeEvent, InstructionText, CheckboxFields } from "$lib/ui/forms"
	import { SkillRanks } from "./SkillRanks"

	export let values: SkillRanks
	export let disabled: boolean

	// single
	export let noexpertise = false

	let checked = SkillRanks.list
		.map((it) => it.name)
		.filter((it) => values.isProficient(it))

	const singleOptions = SkillRanks.list.map((it) => ({
		name: it.name,
		value: it.name,
	}))

	$: values = noexpertise ? SkillRanks.fromList(checked) : values
	// /single

	$: skillNames = SkillRanks.list.map((it) => ({
		name: it.name,
		value: it.name,
		suffix: "(expertise)",
		checked: [values.isProficient(it.name), values.isExpert(it.name)] as [boolean, boolean],
	}))

	const onChange = (e: DoubleCheckboxFieldsChangeEvent) => {
		values = values.copy({
			[e.detail.value]: e.detail.checked.reduce((sum, checked) => sum + (checked ? 1 : 0), 0),
		})
	}
</script>

<Fieldset title="{m["universal.proficiencies"]()}" columns={2}>
	{#if !noexpertise}
		<InstructionText>{m["universal.firstCheckboxIsForProficiencySecondCheckBoxIsForExpertise"]()}</InstructionText>
	{/if}
	{#if noexpertise}
		<CheckboxFields label="Proficiencies" bind:checked {disabled} values={singleOptions} />
	{:else}
		<DoubleCheckboxFields label="Proficiencies" values={skillNames} {disabled} on:change={onChange} />
	{/if}
</Fieldset>
