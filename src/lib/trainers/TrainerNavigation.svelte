<script lang="ts">
	import { TagList, TagSelection } from "$lib/poke5e/tags"
	import { m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { SearchField } from "$lib/ui/forms"
	import { ListHeading } from "$lib/ui/page"
	import * as list from "$lib/utils/list"
	import type { ReorderListChangeEventDetail } from "@auroratide/reorder-list/lib/events"
	import GetStarted from "./GetStarted.svelte"
	import { PageAction } from "./page-action"
	import { trainerListFilterValue } from "./store"
	import TrainerList from "./TrainerList.svelte"
	import type { TrainerListStore } from "./trainers"
	import { trainers as trainerStore } from "./trainers"

	const allTags = trainerStore.tags()

	let {
		trainers,
		showGetStarted = false,
	}: {
		trainers: TrainerListStore,
		showGetStarted?: boolean,
	} = $props()

	const hasNoTrainers = $derived($trainers.length === 0)
	let filteredTags = $state<string[]>([])
	const textFilterIsTagName = $derived(TagList.has($allTags, $trainerListFilterValue))
	const filtered = $derived(
		$trainers
			.filter((it) => {
				const noTagsSpecified = filteredTags.length === 0 && !textFilterIsTagName
				const hasDesiredTag = TagList.overlaps(it.tags, filteredTags)
				const tagIsExplicitlySearched = textFilterIsTagName && TagList.has(it.tags, $trainerListFilterValue)

				return noTagsSpecified || hasDesiredTag || tagIsExplicitlySearched
			})
			.filter((it) => textFilterIsTagName || it.name.toLocaleLowerCase().includes($trainerListFilterValue.toLocaleLowerCase())),
	)

	const resetFilters = () => {
		filteredTags = []
	}

	let reordering = $state(false)
	const onReorder = async (e: CustomEvent<ReorderListChangeEventDetail>) => {
		if (e.detail.oldIndex === e.detail.newIndex) return

		reordering = true
		const newList = list.reorderOne($trainers, e.detail.oldIndex, e.detail.newIndex)
		trainers.reorder(newList).finally(() => {
			reordering = false
		})
	}
</script>

<ListHeading title={m["trainers.trainerList"]()} target="/trainers">
	<a slot="link" href="{Url.trainers(undefined, undefined, PageAction.findTrainer)}" class="dark-font">{m["trainers.findByTrainerID"]()} &gt;</a>
	<Button slot="action" href={Url.trainers(undefined, undefined, PageAction.newTrainer)}>+ {m["trainers.newTrainer"]()}</Button>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-pokemon" label="Search" bind:value={$trainerListFilterValue} matched={filtered.length} max={$trainers.length} activeFilters={filteredTags.length > 0 ? 1 : 0} on:reset={resetFilters}>
		<TagSelection bind:checked={filteredTags} tags={$allTags} />
	</SearchField>
</div>
{#if hasNoTrainers}
	{#if showGetStarted}<GetStarted />{/if}
{:else}
		<TrainerList list={filtered} onreorder={onReorder} saving={reordering} />
{/if}

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}
</style>