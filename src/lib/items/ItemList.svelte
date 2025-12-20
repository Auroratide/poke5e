<script lang="ts">
	import type { Item } from "./types"
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { SearchField } from "$lib/ui/forms"
	import { matchNameOrType } from "./filter"
	import { filterValue, currentSorter } from "./store"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/site/url"

	export let items: Item[]

	$: filteredItems = items.filter(matchNameOrType($filterValue))

	const byStringField = (field: (m: Item) => string) => (l: Item, r: Item) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Item) => number) => (l: Item, r: Item) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-items" label="Search" bind:value={$filterValue} matched={filteredItems.length} max={items.length} />
</div>
<SortableTable let:item let:cellVisibility items={filteredItems} bind:currentSorter={$currentSorter} headers={[ {
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