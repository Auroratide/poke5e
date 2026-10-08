<script lang="ts">
	import { SelectField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import { MoveTime } from "./MoveTime"

	let {
		value = $bindable(),
		label,
		name,
		disabled = false,
		defaultable = false,
	}: {
		value: MoveTime | undefined,
		label: string,
		name?: string,
		disabled?: boolean,
		defaultable?: boolean,
	} = $props()

	const DEFAULT_OPTION = ""

	const timeOptions = MoveTime.options().map((it) => ({
		value: it.value,
		name: it.name(),
	}))

	const options = $derived(defaultable ? [ {
		value: DEFAULT_OPTION,
		name: `- ${m.defaultText()} -`,
	} ].concat(timeOptions) : timeOptions)
</script>

<SelectField bind:value={
	() => value?.unit ?? DEFAULT_OPTION,
	(v) => value = v === DEFAULT_OPTION ? undefined : { unit: v }
} {options} {label} {name} {disabled} />
