<script lang="ts">
	import {
		Fieldset,
		IntField,
		type RankFieldInputEvent,
	} from "$lib/ui/forms"
	import { RanksField } from "$lib/ui/forms"
	import type { PokemonBond } from "$lib/trainers/types"
	import { m } from "$lib/site/i18n"

	export let value: PokemonBond
	export let disabled: boolean = false

	// keep bond level and max points in sync unless they were different
	const onBondLevelChange = (e: RankFieldInputEvent) => {
		if (Math.max(0, value.level) === value.points.max) {
			value.points.max = Math.max(0, e.detail.value)
		}
		value.level = e.detail.value
	}
</script>

<Fieldset title="{m.bond()}" columns={2}>
	<RanksField label="{m.bondLevel()}" min={-3} max={3} value={value.level} on:input={onBondLevelChange} {disabled} />
	<IntField label="{m.maxBondPoints()}" min={0} bind:value={value.points.max} {disabled} />
</Fieldset>
