<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { SelectField } from "$lib/ui/forms"
	import type { MoveDiceType } from "./MoveDice"

	let {
		value = $bindable(),
		label = "Effect",
		name = "move-dice-type",
		disabled = false,
	}: {
		value: MoveDiceType,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const options: { value: MoveDiceType, name: string }[] = [
		{ value: "damage", name: m["movesSection.damage"]() },
		{ value: "healing", name: m["movesSection.healing"]() },
		{ value: "reduction", name: "Damage Reduction" },
	]
</script>

<SelectField bind:value={
	() => value,
	(v) => value = v as MoveDiceType
} {options} {label} {name} {disabled} />
