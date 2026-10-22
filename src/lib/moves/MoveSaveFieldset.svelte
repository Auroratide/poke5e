<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, SelectField } from "$lib/ui/forms"
	import { Attributes, type Attribute } from "$lib/dnd/attributes"
	import type { MoveJson } from "$lib/srd/moves/schema"

	type Value = NonNullable<MoveJson["save"]>

	let {
		value = $bindable(),
		label = m.savingThrows(),
		name = "move-save",
		disabled = false,
	}: {
		value: Value | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const NONE_OPTION = ""

	const options = [ {
		value: NONE_OPTION,
		name: "No Save",
	} ].concat(Attributes.list.map((it) => ({
		value: it.abbr,
		name: it.name,
	})))
</script>

<Fieldset title={label}>
	<SelectField label="Save Attribute" name="{name}-attribute" {options} bind:value={
		() => value?.attribute ?? NONE_OPTION,
		(v) => value = v === NONE_OPTION ? undefined : { attribute: v as Attribute }
	} {disabled} />
</Fieldset>
