<script lang="ts">
	import {
		Fieldset,
		SelectField,
	} from "$lib/design/forms"
	import { CreatureSizes, type CreatureSize } from "$lib/dnd/CreatureSize"
	import { HitDice } from "$lib/dnd/HitDice"
	import { capitalize } from "$lib/string"

	export let customSize: CreatureSize | undefined
	export let customHitDiceSize: HitDice | undefined
	export let disabled: boolean = false

	const sizeOptions = [ {
		name: "— Default —",
		value: undefined,
	} ].concat(Object.values(CreatureSizes).map((it) => ({
		name: capitalize(it),
		value: it,
	})))

	const hitDiceOptions = [ {
		name: "— Default —",
		value: undefined,
	} ].concat(HitDice.map((it) => ({
		name: it,
		value: it,
	})))
</script>

<Fieldset title="Custom Basic Info" columns={2}>
	<SelectField label="Size" options={sizeOptions} bind:value={customSize} {disabled} />
	<SelectField label="Hit Dice" options={hitDiceOptions} bind:value={customHitDiceSize} {disabled} />
</Fieldset>