<script lang="ts">
	import { Fieldset, InstructionText, IntField, SelectField } from "$lib/ui/forms"
	import type { Stab, StabBase } from "./Stab"

	export let value: Stab
	export let disabled = false

	const baseOptions: {
		value: StabBase,
		name: string,
	}[] = [ {
		value: "default",
		name: "Default",
	}, {
		value: "movepower",
		name: "Move Power",
	}, {
		value: "proficiency",
		name: "Proficiency Bonus",
	}, {
		value: "ruleset18",
		name: "'18 Ruleset",
	}, {
		value: "none",
		name: "None",
	} ]
</script>

<Fieldset title="STAB Customization">
	<InstructionText>Hi this is what this is.</InstructionText>
	<SelectField label="STAB Base" bind:value={value.data.base} options={baseOptions} {disabled} />
	<IntField label="STAB Bonus" bind:value={value.data.bonus} {disabled} />
</Fieldset>
