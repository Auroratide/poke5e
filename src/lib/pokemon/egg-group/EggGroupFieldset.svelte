<script lang="ts">
	import { CheckboxFields, Fieldset } from "$lib/ui/forms"
	import { EggGroup } from "./EggGroup"
	import { capitalizeAll } from "$lib/utils/string"

	const options = EggGroup.standardList.map((it) => ({
		name: capitalizeAll(it),
		value: it,
	}))

	export let value: EggGroup
	export let disabled = false
</script>

<Fieldset title="Egg Groups" columns={2} columnsLg={3}>
	<CheckboxFields label="Egg Groups" bind:checked={value.data} values={options} {disabled} />
</Fieldset>
