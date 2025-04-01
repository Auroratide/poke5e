<script lang="ts">
	import type { Item } from "./types"
	import SortableTable from "../design/SortableTable.svelte"
	import SearchField from "../design/SearchField.svelte"
	import { matchNameOrType } from "./filter"
	import { filterValue, currentSorter } from "./store"
	import BubbleRow from "../design/BubbleRow"
	import { formatMoney } from "$lib/pokemon/money"
	import { Url } from "$lib/url"

	export let items: Item[]

	$: filteredItems = items.filter(matchNameOrType($filterValue))

	const byStringField = (field: (m: Item) => string) => (l: Item, r: Item) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Item) => number) => (l: Item, r: Item) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-items" label="Search" bind:value={$filterValue} matched={filteredItems.length} max={items.length} />
</div>
<SortableTable let:item items={filteredItems} bind:currentSorter={$currentSorter} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: "Type", ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "cost", name: "Cost", ratio: 2, sort: byNumericField(it => it.cost ?? -1),
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type.replace(" ", "-")}-bg)">
		<BubbleRow.Cell primary><a href="{Url.items(item.id)}">{item.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell><span class="cap">{item.type}</span></BubbleRow.Cell>
		<BubbleRow.Cell>{item.cost != null ? formatMoney(item.cost) : "-"}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}    
</style>