<script lang="ts">
	import { SortableTable, BubbleRow } from "$lib/ui/page"
	import { SearchField } from "$lib/ui/forms"
	import { MovesFilterStore, MovesSorterStore } from "./store"
	import { Move } from "./Move"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"

	export let moves: Move[]

	$: filteredMoves = moves.filter(Move.matchNameOrType($MovesFilterStore))

	const byStringField = (field: (m: Move) => string) => (l: Move, r: Move) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Move) => number) => (l: Move, r: Move) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$MovesFilterStore} matched={filteredMoves.length} max={moves.length} />
</div>
<SortableTable let:item let:cellVisibility items={filteredMoves} bind:currentSorter={$MovesSorterStore} headers={[ {
	key: "name", name: m["universal.name"](), ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: m["universal.type"](), ratio: 2, sort: byStringField(it => it.type),
}, {
	key: "power", name: m["universal.power"](), ratio: 2, sort: byStringField(it => it.power.toString()), largeScreenOnly: true,
}, {
	key: "pp", name: m["universal.pp"](), ratio: 1, sort: byNumericField(it => it.pp), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type}-bg)">
		<BubbleRow.Cell primary cellVisibility={cellVisibility[0]}><a href="{Url.moves(item.id)}">{item.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{item.type}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{item.power.toString()}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[3]}>{item.pp}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>