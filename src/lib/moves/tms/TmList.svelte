<script lang="ts">
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { SearchField } from "$lib/ui/forms"
	import { TmsFilterStore, TmsSorterStore } from "../store"
	import { formatMoney } from "../../pokemon/money"
	import { Move } from "../Move"
	import { Url } from "$lib/site/url"
	import type { Tm } from "./Tm"
	import { m } from "$lib/site/i18n";
	import { FeatureToggles } from "$lib/site/FeatureToggles"

	export let tms: Tm[]

	$: filtered = tms
		.filter((tm) => Move.matchNameOrType($TmsFilterStore)(tm))
		.filter((tm) => tm.tm.id <= 101 || FeatureToggles.MoreTms())

	const byStringField = (field: (m: Tm) => string) => (l: Tm, r: Tm) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Tm) => number) => (l: Tm, r: Tm) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$TmsFilterStore} matched={filtered.length} max={tms.length} />
</div>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$TmsSorterStore} headers={[ {
	key: "name", name: m["universal.name"](), ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: m["universal.type"](), ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "cost", name: m["universal.cost"](), ratio: 2, sort: byNumericField(it => it.tm.cost), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.tms(item.tm.id.toString())}">{item.tmName()}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.type}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{formatMoney(item.tm.cost)}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>