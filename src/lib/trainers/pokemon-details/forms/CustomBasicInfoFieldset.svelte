<script lang="ts">
	import {
		Fieldset,
		SelectField,
	} from "$lib/ui/forms"
	import { CreatureSizes, type CreatureSize } from "$lib/dnd/CreatureSize"
	import { HitDice, HitDiceSize } from "$lib/dnd/hit-dice"
	import { capitalize } from "$lib/utils/string"
	import { m } from "$lib/site/i18n"

	export let customSize: CreatureSize | undefined
	export let customHitDiceSize: HitDiceSize | undefined
	export let disabled: boolean = false

	const sizeOptions = [ {
		name: `— ${m.defaultText()} —`,
		value: undefined as string | undefined,
	} ].concat(Object.values(CreatureSizes).map((it) => ({
		name: capitalize(it),
		value: it,
	})))

	const hitDiceOptions = [ {
		name: `— ${m.defaultText()} —`,
		value: undefined as string | undefined,
	} ].concat(HitDice.list.map((it) => ({
		name: it,
		value: it,
	})))
</script>

<Fieldset title="Custom Basic Info" columns={2}>
	<SelectField label="Size" options={sizeOptions} bind:value={customSize} {disabled} />
	<SelectField label="Hit Dice" options={hitDiceOptions} bind:value={customHitDiceSize} {disabled} />
</Fieldset>