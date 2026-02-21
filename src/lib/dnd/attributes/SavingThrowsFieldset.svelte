<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, CheckboxFields } from "$lib/ui/forms"
	import { Attributes, type Attribute } from "."

	export let values: Attribute[]
	export let disabled: boolean

	const attributeNames = Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	}))
</script>

<Fieldset title="{m.savingThrows()}" columns={2}>
	<CheckboxFields label="Saving Throws" bind:checked={values} values={attributeNames} {disabled} />
</Fieldset>
