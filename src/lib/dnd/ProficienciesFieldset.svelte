<script lang="ts">
	import { isExpert, isProficient, type SkillRanks } from "$lib/dnd/types"
	import { skillList } from "$lib/dnd/proficiency"
	import { Fieldset, DoubleCheckboxFields, type DoubleCheckboxFieldsChangeEvent, InstructionText } from "$lib/design/forms"

	export let values: SkillRanks
	export let disabled: boolean

	$: skillNames = skillList.map((it) => ({
		name: it.name,
		value: it.name,
		suffix: "(expertise)",
		checked: [isProficient(values, it.name), isExpert(values, it.name)] as [boolean, boolean],
	}))

	const onChange = (e: DoubleCheckboxFieldsChangeEvent) => {
		values = {
			...values,
			[e.detail.value]: e.detail.checked.reduce((sum, checked) => sum + (checked ? 1 : 0), 0),
		}
	}
</script>

<Fieldset title="Proficiencies" columns={2}>
	<InstructionText>First checkbox is for proficiency. Second checkbox is for expertise.</InstructionText>
	<DoubleCheckboxFields label="Proficiencies" values={skillNames} {disabled} on:change={onChange} />
</Fieldset>
