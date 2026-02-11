<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset, RadioFields } from "$lib/ui/forms"
	import { GenderRatio } from "./GenderRatio"

	export let value: GenderRatio
	export let disabled: boolean = false

	let checked = value.data
	$: value = new GenderRatio(checked)

	const possibleRatios = [ {
		name: "100% ♀",
		value: "1:0",
	}, {
		name: "87% ♀ : 13% ♂",
		value: "7:1",
	}, {
		name: "75% ♀ : 25% ♂",
		value: "3:1",
	}, {
		name: "50% ♀ : 50% ♂",
		value: "1:1",
	}, {
		name: "25% ♀ : 75% ♂",
		value: "1:3",
	}, {
		name: "13% ♀ : 87% ♂",
		value: "1:7",
	}, {
		name: "100% ♂",
		value: "0:1",
	}, {
		name: m["universal.genderless"](),
		value: "0:0",
	} ]
</script>

<Fieldset title="{m["universal.genderRatio"]()}" columns={2}>
	<RadioFields label="{m["universal.gender"]()}" bind:checked values={possibleRatios} {disabled} />
</Fieldset>
