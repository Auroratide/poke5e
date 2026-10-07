<script lang="ts">
	import { SelectField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import { MoveType } from "./MoveType"

	let {
		value = $bindable(),
		label = m.type(),
		name,
		disabled = false,
		defaultable = false,
	}: {
		value: MoveType | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
		defaultable?: boolean,
	} = $props()

	const DEFAULT_OPTION = ""

	const options = $derived(defaultable ? [ {
		value: DEFAULT_OPTION,
		name: `- ${m.defaultText()} -`,
	} ].concat(MoveType.options()) : MoveType.options())
</script>

<SelectField bind:value={
	() => value ?? DEFAULT_OPTION,
	(v) => value = v === DEFAULT_OPTION ? undefined : v as MoveType
} {options} {label} {name} {disabled} />
