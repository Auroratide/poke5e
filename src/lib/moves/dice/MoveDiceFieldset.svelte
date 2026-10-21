<script lang="ts">
	import { Fieldset, ToggleSwitchField } from "$lib/ui/forms"
	import { slide } from "svelte/transition"
	import { DiceClass } from "./DiceClass"
	import type { MoveDice } from "./MoveDice"
	import MoveDiceTypeField from "./MoveDiceTypeField.svelte"
	import MoveDiceTiersField from "./MoveDiceTiersField.svelte"
	import MoveDiceModifierField from "./MoveDiceModifierField.svelte"

	let {
		value = $bindable(),
		label = "Damage / Healing",
		name = "move-dice",
		disabled = false,
	}: {
		value: MoveDice | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const DEFAULT_DICE: MoveDice = {
		class: "40",
		tiers: DiceClass.getTier("40"),
		modifier: "MOVE",
		type: "damage",
	}

	// remembered so that toggling dice off and on again does not lose what was entered
	let draft = $state<MoveDice>(value ?? DEFAULT_DICE)

	const update = (changes: Partial<MoveDice>) => {
		draft = { ...draft, ...changes }
		value = draft
	}
</script>

<Fieldset title={label}>
	<ToggleSwitchField label="Rolls dice?" name="{name}-enabled" bind:value={
		() => value != null,
		(on) => value = on ? draft : undefined
	} {disabled} />
	{#if value != null}
		<div class="dice-fields" transition:slide={{ duration: 150 }}>
			<MoveDiceTypeField name="{name}-type" bind:value={
				() => draft.type,
				(type) => update({ type })
			} {disabled} />
			<MoveDiceTiersField {name} bind:value={
				() => draft,
				(it) => update({ class: it.class, tiers: it.tiers })
			} {disabled} />
			<MoveDiceModifierField name="{name}-modifier" bind:value={
				() => draft.modifier,
				(modifier) => update({ modifier })
			} {disabled} />
		</div>
	{/if}
</Fieldset>

<style>
	.dice-fields {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
