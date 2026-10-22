<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { SelectField } from "$lib/ui/forms"
	import type { MoveDiceType } from "./MoveDice"

	let {
		value = $bindable(),
		label = "Roll Effect",
		name = "move-dice-type",
		disabled = false,
		optional = false,
	}: {
		value: MoveDiceType | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
		optional?: boolean,
	} = $props()

	const NONE_OPTION = ""

	const typeOptions: { value: string, name: string }[] = [
		{ value: "damage", name: m["movesSection.damage"]() },
		{ value: "healing", name: m["movesSection.healing"]() },
		{ value: "reduction", name: "Damage Reduction" },
	]

	const options = $derived(optional ? [ {
		value: NONE_OPTION,
		name: "No Dice Roll",
	} ].concat(typeOptions) : typeOptions)
</script>

<SelectField bind:value={
	() => value ?? NONE_OPTION,
	(v) => value = v === NONE_OPTION ? undefined : v as MoveDiceType
} {options} {label} {name} {disabled} />
