<script lang="ts">
	import { Fieldset, CheckboxFields } from "$lib/ui/forms"
	import { Attributes, type Attribute } from "."

	let {
		values = $bindable(),
		label,
		disabled = false,
	}: {
		values: Attribute[],
		label: string,
		disabled?: boolean,
	} = $props()

	const attributeNames = Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	}))
</script>

<Fieldset title={label} columns={2}>
	<CheckboxFields {label} bind:checked={values} values={attributeNames} {disabled} />
</Fieldset>
