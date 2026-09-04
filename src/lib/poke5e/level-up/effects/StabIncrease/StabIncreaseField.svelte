<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { currentEdition } from "$lib/site/edition"
	import { PlusMinus } from "$lib/ui/elements"
	import { Fieldset, InstructionText } from "$lib/ui/forms"
	import CenterStage from "../CenterStage.svelte"
	import FromTo from "../FromTo.svelte"
	import type { StabIncreaseEffect } from "./StabIncrease"

	let {
		value,
	}: {
		value: StabIncreaseEffect,
	} = $props()

	let before = $derived(value.props.stab.calculate(0, value.props.currentLevel, $currentEdition))
	let after = $derived(value.props.stab.calculate(0, value.props.currentLevel.next(), $currentEdition))
</script>

{#if after > before}
	<Fieldset title={m.stabIncrease()}>
		<InstructionText>{m.stabIncreaseInstructions()}</InstructionText>
		<CenterStage>
			<FromTo>
				{#snippet from()}
					<PlusMinus value={before} />
				{/snippet}
				{#snippet to()}
					<PlusMinus value={after} />
				{/snippet}
			</FromTo>
		</CenterStage>
	</Fieldset>
{/if}
