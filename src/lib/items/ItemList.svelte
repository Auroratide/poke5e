<script lang="ts">
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { RelativeNumberField, SearchField, SelectField, type RelativeValue } from "$lib/ui/forms"
	import { ItemFilterStore, ItemSorterStore } from "./store"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/site/url"
	import { Item, ItemTypes, type ItemType } from "./Item"
	import { m } from "$lib/site/i18n"
	import { capitalize } from "$lib/utils/string"
	import { ItemFilter } from "./ItemFilter"

	export let items: Item[]

	const AnyOption = [ {
		name: `- ${m["universal.any"]()} -`,
		value: "",
	} ]

	let filteredType: ItemType | "" = ""
	const typeOptions = AnyOption.concat(Object.values(ItemTypes).map((it) => ({
		value: it,
		name: capitalize(it),
	})))

	let filteredCost: number | undefined = undefined
	let filteredCostRelative: RelativeValue = "="

	$: textFilterIsPokemonType = ItemTypes.includes($ItemFilterStore.toLocaleLowerCase() as ItemType)

	$: filter = new ItemFilter()
		.name(textFilterIsPokemonType ? "" : $ItemFilterStore)
		.type(filteredType !== "" ? filteredType : textFilterIsPokemonType ? $ItemFilterStore : "")
		.cost(filteredCostRelative, filteredCost)

	$: filteredItems = items.filter(filter.apply)

	const byStringField = (field: (m: Item) => string) => (l: Item, r: Item) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Item) => number) => (l: Item, r: Item) => field(l) - field(r)

	const resetFilters = () => {
		filteredType = ""
		filteredCost = undefined
	}
</script>

<div class="search-field">
	<SearchField id="filter-items" label="Search" bind:value={$ItemFilterStore} matched={filteredItems.length} max={items.length} activeFilters={filter.count() - ($ItemFilterStore !== "" ? 1 : 0)} on:reset={resetFilters}>
		<SelectField label="{m["universal.type"]()}" bind:value={filteredType} options={typeOptions} />
		<RelativeNumberField label="{m["universal.cost"]()}" bind:value={filteredCost} bind:relative={filteredCostRelative} min={0} placeholder="{m["universal.number"]()}" />
	</SearchField>
</div>
<SortableTable let:item let:cellVisibility items={filteredItems} bind:currentSorter={$ItemSorterStore} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: "Type", ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "cost", name: "Cost", ratio: 2, sort: byNumericField(it => it.cost ?? -1), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type.replace(" ", "-")}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.items(item.id)}">{item.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}><span class="cap">{item.type}</span></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{item.cost != null ? formatMoney(item.cost) : "-"}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}    
</style>