<script lang="ts">
	import { CheckboxFields, Fieldset, SelectField } from "$lib/design/forms"
	import { type PokeType, PokemonType } from "./PokemonType"

	const NONE = ""

	export let value: PokeType[]
	export let disabled: boolean = false

	let primary = value[0]
	let secondary = value[1] ?? NONE
	let previousValues = [primary, secondary]

	const primaryTypeOptions = PokemonType.list.map((it) => ({ name: it, value: it }))
	const noneOption = { name: "- None -", value: NONE }
	const disableIf = (predicate: (type: string) => boolean) => (it: { name: string, value: string }) => ({
		...it,
		disabled: predicate(it.value),
	})

	$: secondaryTypeOptions = [noneOption].concat(primaryTypeOptions.map(disableIf((it) => it === primary)))
	$: additionalTypeOptions = primaryTypeOptions.map(disableIf((it) => it === primary || it === secondary))

	$: secondary = primary === secondary ? NONE : secondary // no fire/fire allowed
	$: {
		value = [...new Set([primary, secondary]
			.concat(value.filter((it) => !previousValues.includes(it)))
			.filter(PokemonType.isPokeType),
		)]

		previousValues = [primary, secondary]
	}
</script>

<Fieldset title="Type">
	<SelectField label="Primary" name="type-primary" options={primaryTypeOptions} bind:value={primary} {disabled} />
	<SelectField label="Secondary" name="type-seconary" options={secondaryTypeOptions} bind:value={secondary} {disabled} />
	<fieldset>
		<legend>Additional Types</legend>
		<div class="three-columns">
			<CheckboxFields label="Additional Types" name="type-additional" bind:checked={value} values={additionalTypeOptions} {disabled} />
		</div>
	</fieldset>
</Fieldset>

<style>
	.three-columns {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.25em;
	}
</style>