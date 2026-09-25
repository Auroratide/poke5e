<script lang="ts">
	import { SelectField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import { MoveType } from "./MoveType"

	let {
		value = $bindable(),
		label = m.type(),
		disabled = false,
	}: {
		value: MoveType,
		label?: string,
		disabled?: boolean,
	} = $props()
</script>

<SelectField bind:value options={MoveType.options()} {label} {disabled} />
