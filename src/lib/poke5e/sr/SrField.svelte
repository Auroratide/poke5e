<script lang="ts">
	import { m } from "$lib/site/i18n";
	import { SelectField } from "$lib/ui/forms"
	import { SpeciesRating } from "./SpeciesRating"

	export let value: SpeciesRating
	export let disabled = false

	let selected = value.data.toString()
	$: value = new SpeciesRating(parseFloat(selected))

	const options = [ {
		name: "⅛",
		value: "0.125",
	}, {
		name: "¼",
		value: "0.25",
	}, {
		name: "½",
		value: "0.5",
	}, {
		name: "1",
		value: "1",
	}, {
		name: "2",
		value: "2",
	}, {
		name: "3",
		value: "3",
	}, {
		name: "4",
		value: "4",
	}, {
		name: "5",
		value: "5",
	}, {
		name: "6",
		value: "6",
	}, {
		name: "7",
		value: "7",
	}, {
		name: "8",
		value: "8",
	}, {
		name: "9",
		value: "9",
	}, {
		name: "10",
		value: "10",
	}, {
		name: "11",
		value: "11",
	}, {
		name: "12",
		value: "12",
	}, {
		name: "13",
		value: "13",
	}, {
		name: "14",
		value: "14",
	}, {
		name: "15",
		value: "15",
	} ]
</script>

<SelectField label="{m["universal.sr"]()}" bind:value={selected} {options} {disabled} />
