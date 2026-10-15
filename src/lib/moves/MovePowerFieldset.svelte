<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { CheckboxFields, Fieldset } from "$lib/ui/forms"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"

	let {
		value = $bindable(),
		label = m.movePower(),
		name = "move-power",
		disabled = false,
	}: {
		value: Attribute[],
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const attributeNames = Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	}))
</script>

<Fieldset title={label} columns={3}>
	<CheckboxFields {label} {name} bind:checked={
		() => value,
		(v) => value = v as Attribute[]
	} values={attributeNames} {disabled} />
</Fieldset>
