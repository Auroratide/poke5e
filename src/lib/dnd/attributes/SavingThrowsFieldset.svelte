<script lang="ts">
	import { Fieldset, CheckboxFields } from "$lib/design/forms"
	import { Attributes, type Attribute } from "."

	export let values: Attribute[]
	export let disabled: boolean

	const attributeNames = Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	}))
</script>

<Fieldset title="Saving Throws" columns={2}>
	<CheckboxFields label="Saving Throws" bind:checked={values} values={attributeNames} {disabled} />
</Fieldset>
