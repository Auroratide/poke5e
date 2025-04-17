<script lang="ts">
	import type { Skill } from "$lib/dnd/types"
	import { skillList } from "$lib/dnd/proficiency"
	import { Fieldset, CheckboxFields} from "$lib/design/forms"

	export let values: Skill[]
	export let disabled: boolean

	const skillNames = skillList.map((it) => ({
		name: it.name,
		value: it.name,
	}))
</script>

<Fieldset title="Proficiencies" columns={2}>
	<CheckboxFields label="Proficiencies" bind:checked={values} values={skillNames} {disabled} />
</Fieldset>
