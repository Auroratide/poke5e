<script lang="ts">
	import { SearchAndFilterField, SelectField } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import { Attributes } from "$lib/dnd/attributes"
	import { PokemonType } from "$lib/pokemon/types"

	let {
		idPrefix,
		label,
		nameFilter = $bindable(),
		typeFilter = $bindable(),
		powerFilter = $bindable(),
		matches,
		disabled = false,
	}: {
		idPrefix: string,
		label: string,
		nameFilter: string,
		typeFilter: string,
		powerFilter: string,
		matches: number,
		disabled?: boolean,
	} = $props()

	const countActiveFilters = (...filters: string[]) => filters.reduce((sum, cur) => sum + (cur === "" ? 0 : 1), 0)

	const typeOptions = [ {
		name: `- ${m.any()} -`,
		value: "",
	} ].concat(PokemonType.list.map((it) => ({
		name: it,
		value: it,
	})))

	const movePowerOptions = [ {
		name: `- ${m.any()} -`,
		value: "",
	} ].concat(Attributes.list.map((it) => ({
		name: it.name,
		value: it.abbr,
	})))
</script>

<SearchAndFilterField name="{idPrefix}-search" {label} bind:value={nameFilter} {disabled} {matches} placeholder="{m.eG()} Power Split" activeFilters={countActiveFilters(typeFilter, powerFilter)}>
	<SelectField name="{idPrefix}-type-filter" label={m.type()} options={typeOptions} bind:value={typeFilter} />
	<SelectField name="{idPrefix}-move-power-filter" label={m.power()} options={movePowerOptions} bind:value={powerFilter} />
</SearchAndFilterField>
