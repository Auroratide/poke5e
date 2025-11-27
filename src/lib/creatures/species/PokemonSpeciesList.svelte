<script lang="ts">
	import { base } from "$app/paths"
	import BubbleRow from "$lib/design/BubbleRow"
	import { SearchField } from "$lib/ui/forms"
	import SortableTable from "$lib/design/SortableTable.svelte"
	import { currentSorter, filterValue } from "../store"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import * as asString from "../string"
	import { matchNameOrType2 } from "../filter"
	import { TemporaryBannerMessage } from "$lib/ui/elements"
	import { CanCreateCustomPokemonBanner } from "./CanCreateCustomPokemonBanner"
	import { Url } from "$lib/url"

	export let pokemons: PokemonSpecies[]

	$: filtered = pokemons.filter(matchNameOrType2($filterValue))

	const byStringField = (field: (m: PokemonSpecies) => string) => (l: PokemonSpecies, r: PokemonSpecies) => field(l).localeCompare(field(r))
	const byNumericField = (field: (m: PokemonSpecies) => number) => (l: PokemonSpecies, r: PokemonSpecies) => field(l) - field(r)
</script>

<div class="search-field">
	<SearchField id="filter-moves" label="Search" bind:value={$filterValue} matched={filtered.length} max={pokemons.length} />
</div>
<TemporaryBannerMessage condition={CanCreateCustomPokemonBanner}>
	You can now create <a href="{Url.fakemon()}">custom Pokémon</a>!
</TemporaryBannerMessage>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$currentSorter} headers={[ {
	key: "name", name: "Name", ratio: 3, sort: byStringField(it => it.data.name),
}, {
	key: "type", name: "Type", ratio: 3, sort: byStringField(it => it.type.data.join(", ")),
}, {
	key: "sr", name: "SR", ratio: 1, sort: byNumericField(it => it.sr.data), largeScreenOnly: true,
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-{item.type.primary}-bg)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{base}/pokemon/{item.data.id}">{item.data.name}</a></BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[1]}>{asString.type(item.type.data)}</BubbleRow.Cell>
		<BubbleRow.Cell cellVisibility={cellVisibility[2]}>{item.sr.toString()}</BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.search-field {
		margin-bottom: 0.5em;
	}
</style>