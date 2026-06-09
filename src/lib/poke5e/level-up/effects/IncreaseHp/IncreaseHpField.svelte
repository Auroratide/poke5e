<script lang="ts">
	import { Fieldset, InstructionText, IntField, WithButton } from "$lib/ui/forms"
	import { FlatDl, PlusMinus } from "$lib/ui/elements"
	import type { IncreaseHpEffect } from "./IncreaseHp"

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
			increaseAmount
		}
	})
</script>

<Fieldset title="HP Increase">
	<InstructionText>Average for hit dice is filled in automatically. Tap "Roll" to put yourself in fate's hands! Your constitution bonus is added in for you.</InstructionText>
	<WithButton label="Roll {value.props.hitDice.data}" on:click={onRoll}>
		<IntField label="Increase HP by" bind:value={inputValue} />
	</WithButton>
	<FlatDl>
		<dt>CON</dt>
		<dd><PlusMinus value={value.props.attributes.con.modifier} /></dd>
		<dt class="summary">Summary</dt>
		<dd class="summary">{value.props.currentHp} → {resultHp}</dd>
	</FlatDl>
</Fieldset>

<style>
	.summary {
		font-size: var(--font-sz-neptune);
		margin-block-start: 0.25em;
	}
</style>
