<script lang="ts">
	import { Gender } from "../../types"
	import { Fieldset, RadioFields } from "$lib/design/forms"

	export let value: Gender
	export let disabled: boolean = false

	const genders = [Gender.Male, Gender.Female, Gender.None, Gender.Other].map((it) => ({
		name: it,
		value: it,
	}))
</script>

<Fieldset title="Gender" columns={4}>
	<RadioFields label="Gender" bind:checked={value} values={genders} {disabled} />
</Fieldset>
