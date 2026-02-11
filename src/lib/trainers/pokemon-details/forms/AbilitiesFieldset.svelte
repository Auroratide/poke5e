<script lang="ts">
	import { Fieldset, SelectField } from "$lib/ui/forms"
	import { abilities } from "$lib/pokemon/store"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n"

	const NONE = ""
	const noneOption = { name: "- None -", value: NONE }

	export let ability: string
	export let species: PokemonSpecies
	export let disabled: boolean

	$: myAbilityIds = species.abilities.toList().map((it) => it.id)
	$: nonstandardAbilities = $abilities?.filter((it) => !myAbilityIds.includes(it.id))
	$: abilityOptions = [ {
		name: "Learnable Abilities",
		values: species.abilities.toList().map((it) => {
			const info = $abilities?.find((ability) => ability.id === it.id)

			return {
				name: info?.name + (it.hidden ? " (hidden)" : ""),
				value: it.id,
				deprecated: info?.deprecated ?? false,
			}
		}),
	}, {
		name: "All Other Abilities",
		values: [noneOption].concat(nonstandardAbilities.map((it) => ({
			name: it.name,
			value: it.id,
			deprecated: it.deprecated ?? false,
		}))),
	} ]
</script>

<Fieldset title="{m["universal.ability"]()}">
	<SelectField label="{m["universal.ability"]()}" options={abilityOptions} bind:value={ability} {disabled} />
</Fieldset>
