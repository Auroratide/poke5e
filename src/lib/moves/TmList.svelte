<script lang="ts">
	import type { Tm } from "./types"
	import { base } from "$app/paths"
	import SortableTable from "../design/SortableTable.svelte"
	import { SearchField } from "$lib/ui/forms"
	import { matchNameOrType } from "./filter"
	import { filterTmValue, currentTmSorter } from "./store"
	import BubbleRow from "../design/BubbleRow"
	import { formatMoney } from "../pokemon/money"

	export let tms: Tm[]

	$: filtered = tms.filter(tm => matchNameOrType($filterTmValue)(tm.moveInfo))

	const byStringField = (field: (m: Tm) => string) => (l: Tm, r: Tm) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Tm) => number) => (l: Tm, r: Tm) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$filterTmValue} matched={filtered.length} max={tms.length} />
</div>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$currentTmSorter} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.moveInfo.name),
}, {
	key: "type", name: "Type", ratio: 2, sort: byStringField(it => it.moveInfo.type),
}, {
	key: "cost", name: "Cost", ratio: 2, sort: byNumericField(it => it.cost), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.moveInfo.type}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{base}/tms/{item.id}">{item.moveInfo.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.moveInfo.type}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{formatMoney(item.cost)}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>