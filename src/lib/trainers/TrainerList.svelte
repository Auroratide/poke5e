<script lang="ts">
	import { SearchField } from "$lib/ui/forms"
	import { SortableTable, BubbleRow, ListHeading } from "$lib/ui/page"
	import { trainerListFilterValue, trainerListSorter } from "./store"
	import type { TrainerListStore } from "./trainers"
	import type { Trainer } from "./types"
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { PageAction } from "./page-action"
	import GetStarted from "./GetStarted.svelte"

	export let trainers: TrainerListStore
	export let showGetStarted = false

	$: hasNoTrainers = $trainers.length === 0
	$: filtered = $trainers.filter((it) => it.name.toLocaleLowerCase().includes($trainerListFilterValue.toLocaleLowerCase()))

	const byStringField = (field: (m: Trainer) => string) =>
		(l: Trainer, r: Trainer) => field(l).localeCompare(field(r))
</script>

<ListHeading title="Trainer List" target="/trainers">
	<a slot="link" href="{Url.trainers(undefined, undefined, PageAction.findTrainer)}" class="dark-font">Find by trainer ID &gt;</a>
	<Button slot="action" href="{Url.trainers(undefined, undefined, PageAction.newTrainer)}">+ New Trainer</Button>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-pokemon" label="Search" bind:value={$trainerListFilterValue} matched={filtered.length} max={$trainers.length} />
</div>
{#if hasNoTrainers}
	{#if showGetStarted}<GetStarted />{/if}
{:else}
	<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$trainerListSorter} headers={[ {
		key: "name", name: "Name", ratio: 1, sort: byStringField(it => it.name),
	} ]}>
		<BubbleRow.Row interactive mainBg="var(--skin-bg-dark)">
			<BubbleRow.Cell cellVisibility={cellVisibility[0]} primary><a href="{Url.trainers(item.readKey)}">{item.name}</a></BubbleRow.Cell>
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