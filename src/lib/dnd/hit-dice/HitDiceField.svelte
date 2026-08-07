<script lang="ts">
	import { HitDice, HitDiceSize } from "./HitDice"
	import { SelectField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"

	let {
		value = $bindable(),
		disabled = false,
	}: {
		value: HitDiceSize | undefined,
		disabled?: boolean,
	} = $props()

	const hitDiceOptions = [ {
		name: `— ${m.defaultText()} —`,
		value: undefined as string | undefined,
	} ].concat(HitDice.list.map((it) => ({
		name: it,
		value: it,
	})))
</script>

<SelectField label="Hit Dice" options={hitDiceOptions} bind:value {disabled} />
