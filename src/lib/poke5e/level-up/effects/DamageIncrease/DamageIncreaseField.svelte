<script lang="ts">
	import { MovesStore } from "$lib/moves/store"
	import { m } from "$lib/site/i18n"
	import { FlatDl } from "$lib/ui/elements"
	import { Fieldset, HintText, InstructionText } from "$lib/ui/forms"
	import FromTo from "../FromTo.svelte"
	import type { DamageIncreaseEffect } from "./DamageIncrease"

	let {
		value,
	}: {
		value: DamageIncreaseEffect,
	} = $props()

	const moveDetails = $derived(
		value.props.moves
			.map((move) => $MovesStore?.find((it) => it.id === move.moveId))
			.filter((it) => it != null),
	)
	const hasDamagingMoves = $derived(moveDetails.filter((it) => it.damage != null).length > 0)
	const curLevel = $derived(value.props.currentLevel)
	const nextLevel = $derived(value.props.currentLevel.next())
</script>

<Fieldset title={m.damageIncrease()}>
	<InstructionText>{m.damageIncreaseInstructions()}</InstructionText>
	{#if hasDamagingMoves}
		<div class="moves">
			<FlatDl>
				{#each moveDetails as move}
					{#if move.damage != null}
						<dt>{move.name}</dt>
						<dd><FromTo from={move.damage.getDamageDice(curLevel.data)} to={move.damage.getDamageDice(nextLevel.data)} /></dd>
					{/if}
				{/each}
			</FlatDl>
		</div>
	{:else}
		<HintText>{m.noDamagingMoves()}</HintText>
	{/if}
</Fieldset>

<style>
	.moves {
		margin-inline: 1em;
		font-size: 1.125em;
	}
</style>