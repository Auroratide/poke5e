<script lang="ts">
	import { Fieldset, SelectField } from "$lib/design/forms"
	import { abilities } from "$lib/pokemon/store"
	import type { Pokemon } from "$lib/creatures/types"

	export let ability: string
	export let species: Pokemon
	export let disabled: boolean

	$: myAbilityIds = species.abilities.map((it) => it.id)
	$: nonstandardAbilities = $abilities?.filter((it) => !myAbilityIds.includes(it.id))
	$: abilityOptions = [ {
		name: "Learnable Abilities",
		values: species.abilities.map((it) => ({ name: it.name, value: it.id })),
	}, {
		name: "All Other Abilities",
		values: nonstandardAbilities.map((it) => ({ name: it.name, value: it.id })),
	} ]
</script>

<Fieldset title="Feats">
	<SelectField label="Ability" options={abilityOptions} bind:value={ability} {disabled} />
</Fieldset>
