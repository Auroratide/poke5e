<script lang="ts">
	import { CheckboxFields, Fieldset } from "$lib/ui/forms"
	import { EggGroup } from "./EggGroup"
	import { capitalizeAll } from "$lib/utils/string"
	import { m } from "$lib/site/i18n"

	const options = EggGroup.standardList.map((it) => ({
		name: capitalizeAll(it),
		value: it,
	}))

	export let value: EggGroup
	export let disabled = false
</script>

<Fieldset title="{m["universal.eggGroups"]()}" columns={2} columnsLg={3}>
	<CheckboxFields label="{m["universal.eggGroups"]()}" bind:checked={value.data} values={options} {disabled} />
</Fieldset>
