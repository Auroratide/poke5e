<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { SelectField } from "$lib/ui/forms"
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

	$: secondary = primary === secondary ? NONE : secondary // no fire/fire allowed
	$: {
		value = [...new Set([primary, secondary]
			.concat(value.filter((it) => !previousValues.includes(it)))
			.filter(PokemonType.isPokeType),
		)]

		previousValues = [primary, secondary]
	}
</script>

<div class="simple-type-field">
	<SelectField label="{m["universal.primaryType"]()}" name="type-primary" options={primaryTypeOptions} bind:value={primary} {disabled} />
	<SelectField label="{m["universal.secondaryType"]()}" name="type-seconary" options={secondaryTypeOptions} bind:value={secondary} {disabled} />
</div>

<style>
	.simple-type-field {
		display: flex;
		inline-size: 100%;
		align-items: center;
		gap: 1em;
	} .simple-type-field :global(> *) {
		flex: 1;
	}
</style>