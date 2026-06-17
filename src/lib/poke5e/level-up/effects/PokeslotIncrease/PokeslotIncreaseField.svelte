<script lang="ts">
	import { Pokeslots } from "$lib/poke5e/pokeslots"
	import { m } from "$lib/site/i18n"
	import { Fieldset, InstructionText } from "$lib/ui/forms"
	import CenterStage from "../CenterStage.svelte"
	import FromTo from "../FromTo.svelte"
	import type { PokeslotIncreaseEffect } from "./PokeslotIncrease"

	let {
		value,
	}: {
		value: PokeslotIncreaseEffect,
	} = $props()

	let before = $derived(Pokeslots.maxAllowed(value.props.currentLevel))
	let after = $derived(Pokeslots.maxAllowed(value.props.currentLevel.next()))
</script>

<Fieldset title={m.additionalPokeslot()}>
	<InstructionText>{m.pokeslotIncreaseInstructions()}</InstructionText>
	<CenterStage><FromTo from="{before.toString()} slots" to="{after.toString()} slots" /></CenterStage>
</Fieldset>
