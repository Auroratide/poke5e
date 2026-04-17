<script lang="ts" context="module">
	export const getAbilityFieldName = (id: string) => `ability-id-${id}`
</script>

<script lang="ts">
	import { Divider, MarkdownField, Removable, SelectField, TextField, type SelectFieldChangeEvent } from "$lib/ui/forms"
	import { Ability } from "./Ability"
	import { m } from "$lib/site/i18n"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { AbilityStore } from "./AbilityStore";

	export let id: string
	export let value: Ability
	export let species: PokemonSpecies
	export let disabled: boolean = false

	$: fieldName = getAbilityFieldName(id)

	$: abilitiesAsList = species.abilities.toList()

	// This accounts for whether the ability is a canon ability or chosen off the fakemon list
	// Custom abilites from fakemon are frozen on the pokemon, to prevent surprise edits to
	// potential 3rd party fakemon users. However, for convenience we want it to appear in the
	// select menu if it is exactly the same.
	$: currentAbilityIndex = abilitiesAsList.findIndex((it) => it.value.isExactlyTheSame(value))
	$: currentSelectValue = value.referenceId ?? (currentAbilityIndex >= 0 ? currentAbilityIndex.toString() : undefined)

	$: myAbilityIds = species.abilities.toList().map((it) => it.value.referenceId).filter((it) => it != null)
	$: nonstandardAbilities = $AbilityStore?.filter((it) => !myAbilityIds.includes(it.referenceId))
	$: abilityOptions = [ {
		name: "Learnable Abilities",
		values: abilitiesAsList.map((ability, index) => {
			return {
				name: ability.value.name + (ability.hidden ? " (hidden)" : ""),
				value: ability.value.referenceId ?? `${index}`,
				deprecated: ability.value.deprecated ?? false,
			}
		}),
	}, {
		name: "All Other Abilities",
		values: nonstandardAbilities?.map((it) => ({
			name: it.name,
			value: it.referenceId,
			deprecated: it.deprecated ?? false,
		})) ?? [],
	} ]

	const handleSelectChange = async (e: SelectFieldChangeEvent) => {
		const asCustomIndex = parseInt(e.detail.value)
		let newAbility: Ability

		if (isNaN(asCustomIndex)) {
			// is a canon ability
			newAbility = await Ability.resolve(e.detail.value)
		} else {
			newAbility = abilitiesAsList[asCustomIndex]?.value
		}

		if (newAbility) {
			value.data.name = newAbility.name
			value.data.description = newAbility.description
			value.data.referenceId = newAbility.referenceId
		}
	}
</script>

{#if currentSelectValue}
	<Removable on:remove>
		<SelectField label="{m.ability()}" name="{fieldName}" options={abilityOptions} value={currentSelectValue} {disabled} on:change={handleSelectChange} />
	</Removable>
{:else}
	<Removable on:remove>
		<TextField label="{m.name()}" name="{fieldName}" bind:value={value.data.name} {disabled} />
	</Removable>
	<MarkdownField label="{m.description()}" name="{fieldName}-description" bind:value={value.data.description} {disabled} />
{/if}
<Divider />