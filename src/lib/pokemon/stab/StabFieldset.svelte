<script lang="ts">
	import { Fieldset, InstructionText, IntField, SelectField } from "$lib/ui/forms"
	import type { Stab, StabBase } from "./Stab"
	import { m } from "$lib/site/i18n"

	export let value: Stab
	export let disabled = false

	const baseOptions: {
		value: StabBase,
		name: string,
	}[] = [ {
		value: "default",
		name: m.default(),
	}, {
		value: "movepower",
		name: m.movePower(),
	}, {
		value: "proficiency",
		name: m.proficiencyBonus(),
	}, {
		value: "ruleset18",
		name: m.ruleset18(),
	}, {
		value: "none",
		name: m.none(),
	} ]

	const baseDescriptions = {
		default: m.customStabDefaultDescription(),
		movepower: m.customStabMovePowerDescription(),
		proficiency: m.customStabProficiencyDescription(),
		ruleset18: m.customStabRuleset18Description(),
		none: m.customStabNoneDescription(),
	}

	$: selectedOption = baseOptions.find((it) => it.value === value.base)
	$: description = baseDescriptions[selectedOption.value]
</script>

<Fieldset title="STAB Customization">
	<InstructionText>{m.customStabInstructions()}</InstructionText>
	<SelectField label="STAB Base" bind:value={value.data.base} options={baseOptions} {disabled} />
	<InstructionText><strong>{selectedOption.name}:</strong> {description}</InstructionText>
	<IntField label="STAB Bonus" bind:value={value.data.bonus} {disabled} />
</Fieldset>
