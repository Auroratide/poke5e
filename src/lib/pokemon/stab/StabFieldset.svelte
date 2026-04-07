<script lang="ts">
	import { Fieldset, InstructionText, IntField, RadioFields } from "$lib/ui/forms"
	import type { Stab, StabBase } from "./Stab"

	export let value: Stab

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
	<RadioFields label="STAB Base" bind:checked={value.data.base} values={baseOptions} />
	<IntField label="STAB Bonus" bind:value={value.data.bonus} />
</Fieldset>
