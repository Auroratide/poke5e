<script lang="ts">
	import BubbleRow from "$lib/design/BubbleRow"
	import Button from "$lib/design/Button.svelte"
	import ListHeading from "$lib/design/ListHeading.svelte"
	import SearchField from "$lib/design/SearchField.svelte"
	import SortableTable from "$lib/design/SortableTable.svelte"
	import { Url } from "$lib/url"
	import type { Fakemon } from "../Fakemon"
	import type { FakemonListStore } from "../store"
	import { PageAction } from "./actions"
	import { fakemonListSorter, fakemonListFilter } from "./sort-and-filter"

	export let fakemon: FakemonListStore
	$: filtered = $fakemon.filter((it) => it.data.species.name.toLocaleLowerCase().includes($fakemonListFilter.toLocaleLowerCase()))

	const byStringField = (field: (m: Fakemon) => string) =>
		(l: Fakemon, r: Fakemon) => field(l).localeCompare(field(r))
</script>

<ListHeading title="Fakémon" target="/fakemon">
	<a slot="link" href="{Url.fakemon(undefined, PageAction.find)}" class="dark-font">Find by fakémon ID &gt;</a>
	<Button slot="action" href="{Url.fakemon(undefined, PageAction.add)}">+ New Fakémon</Button>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-fakemon" label="Search" bind:value={$fakemonListFilter} matched={filtered.length} max={$fakemon.length} />
</div>
<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$fakemonListSorter} headers={[ {
	key: "name", name: "Name", ratio: 1, sort: byStringField(it => it.data.species.name),
} ]}>
	<BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
		<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.fakemon(item.data.readKey)}">{item.data.species.name}</a></BubbleRow.Cell>
	</BubbleRow.Row>
</SortableTable>

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}
</style>
