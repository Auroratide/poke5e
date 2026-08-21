<script lang="ts">
	import { Saveable, SearchField } from "$lib/ui/forms"
	import { filterValue } from "../store"
	import { afterNavigate, goto } from "$app/navigation"
	import { browser } from "$app/environment"
	import { isTwoColumn } from "$lib/utils/media"
	import { PokemonStorage, isInParty, isInBox } from "../pokemon-storage"
	import { matchesPokemonFilter } from "../pokemon-filter"
	import BoxDrawer from "./BoxDrawer.svelte"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId } from "../types"
	import { Button, VisuallyHidden } from "$lib/ui/elements"
	import PokemonSummary from "./PokemonSummary.svelte"
	import TrainerSummary from "./TrainerSummary.svelte"
	import { Url } from "$lib/site/url"
	import { PageAction } from "../page-action"
	import { m } from "$lib/site/i18n"
	import type { ReorderListChangeEventDetail } from "@auroratide/reorder-list/lib/events"
	import * as list from "$lib/utils/list"
	import { DefaultTagSelectionMode, TagSelection, type TagSelectionMode } from "$lib/poke5e/tags"

	export let trainer: TrainerStore
	export let currentPokemon: PokemonId | undefined
	export let isFullList: boolean = false

	$: editable = $trainer.update != null
	// Every tag on any of the trainer's pokemon, party and box alike, so both
	// filters below offer the same set.
	$: pokemonTags = $trainer.tags.getForPokemon()

	// The party's own filter state. The Box keeps its own copy of both, so the two
	// panels filter independently -- see BoxDrawer.
	let filteredTags: string[] = []
	let filterTagMode: TagSelectionMode = DefaultTagSelectionMode

	// The one place the roster is split. Everything below works on `party` or on
	// `boxed`; `$trainer.pokemon` is only touched again when a reorder has to be
	// written back, because the server needs the whole list. See pokemon-storage.
	$: party = $trainer.pokemon.filter(isInParty)
	$: boxed = $trainer.pokemon.filter(isInBox)
	$: filtered = party.filter(matchesPokemonFilter($filterValue, filteredTags, filterTagMode, pokemonTags))

	// Owned here rather than inside BoxDrawer, because the party list has to
	// shrink to make room (see .box-open below) and, on a narrow screen, the
	// drawer has to be closed for it from the outside.
	let boxOpen = false

	let reordering = false
	const onReorder = (e: CustomEvent<ReorderListChangeEventDetail>) => {
		if (e.detail.oldIndex === e.detail.newIndex) return

		reordering = true
		// The drag reports indices into what is rendered -- the party, minus
		// anything the filter hides -- so the move has to be mapped back onto the
		// whole roster before it can be saved.
		const reorderedVisible = list.reorderOne(filtered, e.detail.oldIndex, e.detail.newIndex)
		const newList = list.applyOrderToSubset($trainer.pokemon, filtered, reorderedVisible, (it) => it.id)
		$trainer.update?.reorderTeam(newList).finally(() => {
			reordering = false
		})
	}

	// On a narrow screen the box and the detail card cannot both be open: the side
	// column is only a third of the viewport while a card is showing, leaving the
	// box almost no room. Opening the box empties the main column -- reusing the
	// full-list action the trainer card already dismisses to -- and opening a card
	// closes the box, which is what the navigation below catches.
	const onBoxExpand = () => {
		if (browser && !isTwoColumn() && !isFullList) {
			goto(Url.trainers($trainer.info.readKey, undefined, PageAction.fullList), {
				noScroll: true,
				keepFocus: true,
			})
		}
	}

	afterNavigate(() => {
		if (boxOpen && !isTwoColumn() && !isFullList) {
			boxOpen = false
		}
	})

	// setStorage surfaces its own errors; the drawer only needs to know the
	// request has settled so it can re-enable the row.
	const onWithdraw = (id: PokemonId) =>
		$trainer.update?.setStorage(id, PokemonStorage.Party).catch(() => {}) ?? Promise.resolve()

	const resetFilters = () => {
		filteredTags = []
		filterTagMode = DefaultTagSelectionMode
	}
</script>

<div class="roster-header">
	<div class="header-row">
		<a class="back-link" href="{Url.trainers()}"><span aria-hidden="true">&larr;</span> {m["trainers.trainerList"]()}</a>
		<span style:visibility={editable ? "visible" : "hidden"} style:display="flex">
			<Button href={Url.trainers($trainer.info.readKey, undefined, PageAction.addPokemon)}>+ {m.addPokemon()}</Button>
		</span>
	</div>
	<!-- The badge carries the trainer's name visually; the panel still needs a
	     heading in the outline, and ListHeading only ever emitted a <p> here. -->
	<VisuallyHidden>
		<h2>{m["trainers.pokemonOf"]({ name: $trainer.info.name })}</h2>
	</VisuallyHidden>
	<TrainerSummary trainer={$trainer.info} current={!currentPokemon && !isFullList} />
</div>
<div class="space-bottom">
	<SearchField id="filter-pokemon" label={m["trainers.searchParty"]()} bind:value={$filterValue} matched={filtered.length} max={party.length} activeFilters={filteredTags.length > 0 ? 1 : 0} on:reset={resetFilters}>
		<TagSelection bind:checked={filteredTags} bind:mode={filterTagMode} tags={pokemonTags} />
	</SearchField>
</div>
<!--
	The party list and the box drawer share this positioned box: the party
	scrolls inside it and the drawer is absolutely positioned against its bottom
	edge, so the two split one fixed height between them rather than the drawer
	overlaying the party. The --box-* custom properties at the end of the style
	block are the contract between them.
-->
<div class="relative" class:box-open={boxOpen}><!-- Needed for the > indicators to appear outside the scroll box -->
	<div class="scrollable">
		{#if editable}
			<Saveable saving={reordering}>
				<reorder-list class="nolist no-space full-width" on:commit={onReorder}>
					{#each filtered as p (p.id)}
						<reorder-item class="space-after">
							<PokemonSummary trainer={$trainer.info.readKey} pokemon={p} editable />
						</reorder-item>
					{/each}
				</reorder-list>
			</Saveable>
		{:else}
			<ul class="nolist no-space full-width">
				{#each filtered as p (p.id)}
					<li class="space-after">
						<PokemonSummary trainer={$trainer.info.readKey} pokemon={p} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<BoxDrawer
		bind:open={boxOpen}
		trainer={$trainer.info}
		{boxed}
		tags={pokemonTags}
		{editable}
		onexpand={onBoxExpand}
		onwithdraw={onWithdraw}
	/>
</div>

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.roster-header {
		display: flex;
		flex-direction: column;
		gap: 0.375em;
		margin-bottom: 0.5em;
	}

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
	}

	.back-link {
		color: var(--skin-content-text);
		font-size: var(--font-sz-venus);
		text-decoration: none;
		padding-inline: 0.5em;
	}

	.back-link:hover, .back-link:focus {
		text-decoration: underline;
	}

	.no-space {
		margin: 0;
	}

	.scrollable {
		height: 100%;
		overflow: auto;
		/* So the last party badge can scroll clear of the collapsed box bar. */
		padding-block-end: var(--box-bar-size);
		transition: height 200ms ease-in-out;

		/* Its own stacking context, so the pokemon sprites' internal z-indexes
		   (the held-item badge sits at 3) stay trapped in here instead of painting
		   over the box drawer above them. */
		position: relative;
		z-index: 0;
	}

	/* While the drawer is open the party keeps only the space above it, so the
	   whole party stays reachable by scrolling rather than hiding behind it. */
	.relative.box-open .scrollable {
		height: calc(100% - var(--box-open-size));
	}

	@media (prefers-reduced-motion: reduce) {
		.scrollable {
			transition: none;
		}
	}

	.space-after {
		margin-bottom: 0.5em;
	}

	.full-width {
		width: 100%;
	}

	.relative {
		position: relative;
		height: 0;
		flex: 1;
		/* Shared with the box drawer, which anchors to the bottom of this box. */
		--box-bar-size: 2.25em;
		/* How much of this box the drawer takes when open. On a narrow screen the
		   box is the only thing showing, so it claims more of the column. */
		--box-open-size: 50%;
	}

	@media screen and (max-width: 37.4375rem) {
		.relative {
			--box-open-size: 70%;
		}
	}
</style>