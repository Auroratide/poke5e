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
	import { m } from "$lib/site/i18n"
	import { TagList, TagSelection } from "$lib/poke5e/tags"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import { trainers as trainerStore } from "./trainers"

	const allTags = trainerStore.tags()

	export let trainers: TrainerListStore
	export let showGetStarted = false

	$: hasNoTrainers = $trainers.length === 0
	let filteredTags: string[] = []

	$: filtered = $trainers
		.filter((it) => filteredTags.length === 0 || TagList.overlaps(it.tags, filteredTags))
		.filter((it) => it.name.toLocaleLowerCase().includes($trainerListFilterValue.toLocaleLowerCase()))

	const byStringField = (field: (m: Trainer) => string) =>
		(l: Trainer, r: Trainer) => field(l).localeCompare(field(r))

	const resetFilters = () => {
		filteredTags = []
	}
</script>

<ListHeading title="{m["trainers.trainerList"]()}" target="/trainers">
	<a slot="link" href="{Url.trainers(undefined, undefined, PageAction.findTrainer)}" class="dark-font">{m["trainers.findByTrainerID"]()} &gt;</a>
	<Button slot="action" href="{Url.trainers(undefined, undefined, PageAction.newTrainer)}">+ {m["trainers.newTrainer"]()}</Button>
</ListHeading>
<div class="space-bottom">
	{#if FeatureToggles.Tagging()}
		<SearchField id="filter-pokemon" label="Search" bind:value={$trainerListFilterValue} matched={filtered.length} max={$trainers.length} activeFilters={filteredTags.length > 0 ? 1 : 0} on:reset={resetFilters}>
			<TagSelection bind:checked={filteredTags} tags={$allTags} />
		</SearchField>
	{:else}
		<SearchField id="filter-pokemon" label="Search" bind:value={$trainerListFilterValue} matched={filtered.length} max={$trainers.length} activeFilters={filteredTags.length > 0 ? 1 : 0} on:reset={resetFilters} />
	{/if}
</div>
{#if hasNoTrainers}
	{#if showGetStarted}<GetStarted />{/if}
{:else}
	<SortableTable let:item let:cellVisibility items={filtered} bind:currentSorter={$trainerListSorter} headers={[ {
		key: "name", name: m.name(), ratio: 1, sort: byStringField(it => it.name),
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