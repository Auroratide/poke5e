<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { SortableTable, BubbleRow, ListHeading } from "$lib/ui/page"
	import { SearchField } from "$lib/ui/forms"
	import { Url } from "$lib/site/url"
	import type { Fakemon } from "../Fakemon"
	import type { FakemonListStore } from "../store"
	import { PageAction } from "./actions"
	import GetStarted from "./GetStarted.svelte"
	import { fakemonListSorter, fakemonListFilter } from "./sort-and-filter"
	import { m } from "$lib/site/i18n"

	export let fakemon: FakemonListStore
	export let showGetStarted = false

	$: hasNoFakemon = $fakemon.length === 0
	$: filtered = $fakemon.filter((it) => it.data.species.name.toLocaleLowerCase().includes($fakemonListFilter.toLocaleLowerCase()))

	const byStringField = (field: (m: Fakemon) => string) =>
		(l: Fakemon, r: Fakemon) => field(l).localeCompare(field(r))
</script>

<ListHeading title="Fakémon" target="/fakemon">
	<a slot="link" href="{Url.fakemon(undefined, PageAction.find)}" class="dark-font">{m["fakemon.findByFakemonID"]()} &gt;</a>
	<Button slot="action" href="{Url.fakemon(undefined, PageAction.add)}">+ {m["universal.newFakemon"]()}</Button>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-fakemon" label="Search" bind:value={$fakemonListFilter} matched={filtered.length} max={$fakemon.length} />
</div>
{#if hasNoFakemon}
	{#if showGetStarted}<GetStarted />{/if}
{:else}
	<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$fakemonListSorter} headers={[ {
		key: "name", name: m["universal.name"](), ratio: 1, sort: byStringField(it => it.data.species.name),
	} ]}>
		<BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
			<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.fakemon(item.data.readKey)}">{item.data.species.name}</a></BubbleRow.Cell>
		</BubbleRow.Row>
	</SortableTable>
{/if}

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}
</style>
