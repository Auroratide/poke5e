<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species";
	import { Button } from "$lib/ui/elements";
	import { focusInputField, HintText } from "$lib/ui/forms";
	import { Ability, AbilityField } from "."
	import { getAbilityFieldName } from "./AbilityField.svelte";
	import { m } from "$lib/site/i18n"

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

<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>