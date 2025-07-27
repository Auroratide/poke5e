<script lang="ts">
	import { Fieldset, RadioFields } from "$lib/design/forms"
	import { PokemonGender } from "./PokemonGender"

	export let value: PokemonGender
	export let disabled: boolean = false

	const genders = [
		PokemonGender.Male,
		PokemonGender.Female,
		PokemonGender.None,
		PokemonGender.Other,
	].map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Fieldset title="Gender" columns={4}>
	<RadioFields label="Gender" bind:checked={value} values={genders} {disabled} />
</Fieldset>
