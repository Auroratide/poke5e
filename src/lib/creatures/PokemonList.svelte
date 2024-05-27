<script lang="ts">
	import type { Pokemon } from "./types"
	import { base } from "$app/paths"
	import SortableTable from "../design/SortableTable.svelte"
	import SearchField from "../design/SearchField.svelte"
	import * as asString from "./string"
	import { matchNameOrType } from "./filter"
	import { filterValue, currentSorter } from "./store"
	import BubbleRow from "../design/BubbleRow"

	export let pokemons: Pokemon[]

	$: filtered = pokemons.filter(matchNameOrType($filterValue))

	const byStringField = (field: (m: Pokemon) => string) => (l: Pokemon, r: Pokemon) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: Pokemon) => number) => (l: Pokemon, r: Pokemon) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$filterValue} matched={filtered.length} max={pokemons.length} />
</div>
<SortableTable let:item items={filtered} bind:currentSorter={$currentSorter} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.name),
}, {
	key: "type", name: "Type", ratio: 3, sort: byStringField(it => it.type.join(", ")),
}, {
	key: "sr", name: "SR", ratio: 1, sort: byNumericField(it => it.sr),
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type[0]}-bg)">
		<BubbleRow.Cell primary><a href="{base}/pokemon/{item.id}">{item.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell>{asString.type(item.type)}</BubbleRow.Cell>
		<BubbleRow.Cell>{asString.sr(item.sr)}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>