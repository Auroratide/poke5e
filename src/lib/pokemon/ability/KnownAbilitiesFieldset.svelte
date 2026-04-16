<script lang="ts">
	import { Fieldset, focusInputField, HintText } from "$lib/ui/forms";
	import { Ability } from "./Ability";
	import { m } from "$lib/site/i18n"
	import { Button } from "$lib/ui/elements";
	import type { PokemonSpecies } from "$lib/poke5e/species";
	import SpeciesAbilityField, { getAbilityFieldName } from "./SpeciesAbilityField.svelte";

	export let values: Ability[]
	export let species: PokemonSpecies
	export let disabled: boolean = false

	$: firstSpeciesAbility = species.abilities.normal[0]

	let newId = -1001
	const nextNewId = () => (--newId).toString()

	let withIds = values.map((it) => ({
		id: nextNewId(),
		value: it,
	}))

	const remove = (id: string) => () => {
		withIds = withIds.filter((it) => it.id !== id)
	}

	const addStandard = () => {
		const nextId = nextNewId()
		withIds = [...withIds, {
			id: nextId,
			value: Ability.createNewStandard("disguise")
		} ],
		focusInputField(getAbilityFieldName(nextId))
	}

	const addCustom = () => {
		const nextId = nextNewId()
		withIds = [...withIds, {
			id: nextId,
			value: Ability.createNewCustom(),
		} ],
		focusInputField(getAbilityFieldName(nextId))
	}

	$: values = withIds.map((it) => it.value)
</script>

<Fieldset title="{m.abilities()}">
	{#each withIds as ability (ability.id)}
		<SpeciesAbilityField id={ability.id} value={ability.value} {disabled} on:remove={remove(ability.id)} {species} />
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