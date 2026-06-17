<script lang="ts">
	import { SpeciesRating } from "$lib/poke5e/sr"
	import { m } from "$lib/site/i18n"
	import { Fieldset, InstructionText } from "$lib/ui/forms"
	import CenterStage from "../CenterStage.svelte"
	import FromTo from "../FromTo.svelte"
	import type { MaxSrIncreaseEffect } from "./MaxSrIncrease"

	let {
		value,
	}: {
		value: MaxSrIncreaseEffect,
	} = $props()

	let before = $derived(SpeciesRating.maxAllowed(value.props.currentLevel))
	let after = $derived(SpeciesRating.maxAllowed(value.props.currentLevel.next()))
</script>

<Fieldset title="SR Increase">
	<InstructionText>{m.maxSrIncreaseInstructions()}</InstructionText>
	<CenterStage><FromTo from="{before.toString()} SR" to="{after.toString()} SR" /></CenterStage>
</Fieldset>
