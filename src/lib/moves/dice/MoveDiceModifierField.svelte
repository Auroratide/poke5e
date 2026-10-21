<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { SelectField } from "$lib/ui/forms"

	let {
		value = $bindable(),
		label = "Modifier",
		name = "move-dice-modifier",
		disabled = false,
	}: {
		value: string,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const standardOptions = [
		{ value: "MOVE", name: "+ Move Modifier" },
		{ value: "0", name: m.none() },
		{ value: "LEVEL", name: `+ ${m.level()}` },
	]

	const options = $derived(standardOptions.some((it) => it.value === value)
		? standardOptions
		: [...standardOptions, { value, name: value }])
</script>

<SelectField bind:value {options} {label} {name} {disabled} />
