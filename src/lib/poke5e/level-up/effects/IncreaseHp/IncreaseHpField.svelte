<script lang="ts">
	import { Fieldset, InstructionText, IntField, WithButton } from "$lib/ui/forms"
	import { FlatDl, PlusMinus } from "$lib/ui/elements"
	import type { IncreaseHpEffect } from "./IncreaseHp"
	import { m } from "$lib/site/i18n"

	let {
		value,
	}: {
		value: IncreaseHpEffect,
	} = $props()

	let inputValue = $derived(value.props.hitDice.averageValue())
	let increaseAmount = $derived(Math.max(1, inputValue + value.props.attributes.con.modifier))
	let resultHp = $derived(value.props.currentHp + increaseAmount)

	const onRoll = () => {
		inputValue = Math.floor(Math.random() * value.props.hitDice.sizeAsInt()) + 1
	}

	$effect(() => {
		value.params = {
			increaseAmount,
		}
	})
</script>

<Fieldset title={m.hpIncrease()}>
	<InstructionText>{m.levelUpHpInstructions()}</InstructionText>
	<WithButton label={m.rollDice({ dice: value.props.hitDice.data })} on:click={onRoll}>
		<IntField label={m.increaseHpBy()} bind:value={inputValue} />
	</WithButton>
	<FlatDl>
		<dt>CON</dt>
		<dd><PlusMinus value={value.props.attributes.con.modifier} /></dd>
		<dt class="summary">{m.summary()}</dt>
		<dd class="summary">{value.props.currentHp} → {resultHp}</dd>
	</FlatDl>
</Fieldset>

<style>
	.summary {
		font-size: var(--font-sz-neptune);
		margin-block-start: 0.25em;
	}
</style>
