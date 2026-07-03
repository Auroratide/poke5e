<script lang="ts">
	import { RandomDiceRoller } from "$lib/dnd/dice"
	import { DndFeats } from "$lib/dnd/feats"
	import { m } from "$lib/site/i18n"
	import { FlatDl, PlusMinus } from "$lib/ui/elements"
	import { Fieldset, InstructionText, IntField, WithButton } from "$lib/ui/forms"
	import CenterStage from "../CenterStage.svelte"
	import FromTo from "../FromTo.svelte"
	import type { IncreaseHpEffect } from "./IncreaseHp"

	const dice = new RandomDiceRoller()

	let {
		value,
	}: {
		value: IncreaseHpEffect,
	} = $props()

	let contributingFeats = $derived(value.props.feats
		.filter((it) => !it.isCustom)
		.map((chosenFeat) => DndFeats.find((dndFeat) => dndFeat.name === chosenFeat.name))
		.filter((it) => it != null)
		.filter((it) => it.effects?.hpIncrease),
	)
	let contributingFeatAmount = $derived(contributingFeats.reduce((sum, feat) => sum + (feat.effects?.hpIncrease ?? 0), 0))

	let inputValue = $derived(value.props.hitDice.averageValue())
	let increaseAmount = $derived(Math.max(1, inputValue + value.props.attributes.con.modifier + contributingFeatAmount))
	let resultHp = $derived(value.props.currentHp + increaseAmount)

	const onRoll = async () => {
		for await (const result of dice.multiroll(value.props.hitDice.sizeAsInt(), 12)) {
			inputValue = result
			await new Promise((resolve) => setTimeout(resolve, 20))
		}
	}

	$effect(() => {
		value.params = {
			increaseAmount,
		}
	})
</script>

<Fieldset title={m.hpIncrease()}>
	<InstructionText>{m.levelUpHpInstructions()}</InstructionText>
	<div class="field">
		<WithButton label={m.rollDice({ dice: value.props.hitDice.data })} on:click={onRoll}>
			<IntField label={m.increaseHpBy()} bind:value={inputValue} />
		</WithButton>
		<div class="modifier-spacing"></div>
		<FlatDl>
			<dt>CON</dt>
			<dd><PlusMinus value={value.props.attributes.con.modifier} /></dd>
			{#each contributingFeats as feat}
				<dt>{feat.name}</dt>
				<dd><PlusMinus value={feat.effects?.hpIncrease ?? 0} /></dd>
			{/each}
		</FlatDl>
	</div>
	<CenterStage><FromTo from="{value.props.currentHp} HP" to="{resultHp} HP" /></CenterStage>
</Fieldset>

<style>
	.modifier-spacing {
		block-size: 0.25em;
	}
</style>
