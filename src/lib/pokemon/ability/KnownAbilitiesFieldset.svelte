<script lang="ts">
	import { Fieldset, focusInputField, HintText, InstructionText } from "$lib/ui/forms";
	import { Ability } from "./Ability";
	import { m } from "$lib/site/i18n"
	import { Button } from "$lib/ui/elements";
	import { AbilityField } from ".";
	import type { PokemonSpecies } from "$lib/poke5e/species";
	import { getAbilityFieldName } from "./AbilityField.svelte";

	export let values: Ability[]
	export let species: PokemonSpecies
	export let disabled: boolean = false

	let newId = -1001
	const nextNewId = () => (--newId).toString()

	const remove = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addStandard = () => {
		const nextId = nextNewId()
		values = [...values, Ability.createNewStandard(nextId, "disguise") ]
		focusInputField(getAbilityFieldName(nextId))
	}

	const addCustom = () => {
		const nextId = nextNewId()
		values = [...values, Ability.createNewCustom(nextId) ]
		focusInputField(getAbilityFieldName(nextId))
	}
</script>

<Fieldset title="{m.abilities()}">
	{#each values as ability (ability.id)}
		<AbilityField value={ability} {disabled} on:remove={remove(ability.id)} {species} />
	{/each}
	{#if values.length === 0}
		<HintText>{m.noAbilities()}</HintText>
	{/if}
	<div class="row">
		<Button on:click={addStandard}>{m.addAbility()}</Button>
		<Button on:click={addCustom}>{m.addCustomAbility()}</Button>
	</div>
</Fieldset>

<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>