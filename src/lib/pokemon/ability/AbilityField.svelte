<script lang="ts" context="module">
	export const getAbilityFieldName = (id: string) => `ability-id-${id}`
</script>

<script lang="ts">
	import { Divider, MarkdownField, Removable, SelectField, TextField, type SelectFieldChangeEvent } from "$lib/ui/forms"
	import type { Ability } from "./Ability"
	import { m } from "$lib/site/i18n"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { AbilityStore } from "./AbilityStore";
	import { ReferenceAbility } from "./ReferenceAbility";

	export let value: Ability
	export let species: PokemonSpecies
	export let disabled: boolean = false

	$: fieldName = getAbilityFieldName(value.id)

	$: myAbilityIds = species.abilities.toList().map((it) => it.id)
	$: nonstandardAbilities = $AbilityStore?.filter((it) => !myAbilityIds.includes(it.id))
	$: abilityOptions = [ {
		name: "Learnable Abilities",
		values: species.abilities.toList().map((it) => {
			const info = $AbilityStore?.find((ability) => ability.id === it.id)

			return {
				name: info?.name + (it.hidden ? " (hidden)" : ""),
				value: it.id,
				deprecated: info?.deprecated ?? false,
			}
		}),
	}, {
		name: "All Other Abilities",
		values: nonstandardAbilities?.map((it) => ({
			name: it.name,
			value: it.id,
			deprecated: it.deprecated ?? false,
		})) ?? [],
	} ]

	const handleSelectChange = async (e: SelectFieldChangeEvent) => {
		const newAbility = await ReferenceAbility.resolve(value.id, e.detail.value)
		if (newAbility) {
			value.data.name = newAbility.name
			value.data.description = newAbility.description
			value.data.referenceId = newAbility.referenceId
		}
	}
</script>

{#if value.custom}
	<Removable on:remove>
		<TextField label="{m.name()}" name="{fieldName}" bind:value={value.data.name} {disabled} />
	</Removable>
	<MarkdownField label="{m.description()}" name="{fieldName}-description" bind:value={value.data.description} {disabled} />
{:else}
	<Removable on:remove>
		<SelectField label="{m.ability()}" name="{fieldName}" options={abilityOptions} value={value.referenceId} {disabled} on:change={handleSelectChange} />
	</Removable>
{/if}
<Divider />