<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, RadioFields } from "$lib/ui/forms"
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

<Fieldset title="{m["universal.gender"]()}" columns={4}>
	<RadioFields label="{m["universal.gender"]()}" bind:checked={value} values={genders} {disabled} />
</Fieldset>
