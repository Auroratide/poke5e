<script lang="ts">
	import { Fieldset, CheckboxFields } from "$lib/design/forms"
	import { attributeList } from "$lib/dnd/attributes"
	import type { Attributes } from "$lib/dnd/types"

	export let values: (keyof Attributes)[]
	export let disabled: boolean

	const attributeNames = attributeList.map((it) => ({
		name: it.name,
		value: it.abbr,
	}))
</script>

<Fieldset title="Saving Throws" columns={2}>
	<CheckboxFields label="Saving Throws" bind:checked={values} values={attributeNames} {disabled} />
</Fieldset>
