<script lang="ts">
	import { Fieldset, SelectField } from "$lib/design/forms"
	import { abilities } from "$lib/pokemon/store"
	import type { PokemonSpecies } from "$lib/creatures/species"

	export let ability: string
	export let species: PokemonSpecies
	export let disabled: boolean

	$: myAbilityIds = species.abilities.toList().map((it) => it.id)
	$: nonstandardAbilities = $abilities?.filter((it) => !myAbilityIds.includes(it.id))
	$: abilityOptions = [ {
		name: "Learnable Abilities",
		values: species.abilities.toList().map((it) => ({
			name: $abilities?.find((ability) => ability.id === it.id)?.name + (it.hidden ? " (hidden)" : ""),
			value: it.id,
		})),
	}, {
		name: "All Other Abilities",
		values: nonstandardAbilities.map((it) => ({ name: it.name, value: it.id })),
	} ]
</script>

<Fieldset title="Ability">
	<SelectField label="Ability" options={abilityOptions} bind:value={ability} {disabled} />
</Fieldset>
