<!--
	The Box: the trainer's stored pokemon, as a drawer that slides up from the
	bottom of the roster's list box.

	It is a disclosure, not a dialog. The party list behind it stays usable, so
	there is no focus trap and no click-outside-to-close -- a stray click would
	throw away the filter query and the scroll position. Escape closes it and
	hands focus back to the bar.

	Two things come from the roster rather than living here:
	  - `open`, because the party list has to give up height to make room, and on
	    a narrow screen the roster closes the drawer when a detail card appears.
	  - the --box-bar-size / --box-open-size custom properties, which are declared
	    on the positioned box this drawer anchors to.
-->
<script lang="ts">
	import { SearchField } from "$lib/ui/forms"
	import { ChevronIcon } from "$lib/ui/icons"
	import { DefaultTagSelectionMode, TagSelection, type TagList, type TagSelectionMode } from "$lib/poke5e/tags"
	import { m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
	import { PageAction } from "../page-action"
	import { matchesPokemonFilter } from "../pokemon-filter"
	import PokemonSummary from "./PokemonSummary.svelte"
	import type { PokemonId, Trainer, TrainerPokemon } from "../types"

	const BAR_ID = "box-drawer-bar"
	const PANEL_ID = "box-drawer-panel"

	let {
		open = $bindable(false),
		trainer,
		boxed,
		tags,
		editable = false,
		onexpand,
		onwithdraw,
	}: {
		/**
		 * Owned by the roster, which closes the drawer when the detail column
		 * fills up on a narrow screen.
		 */
		open?: boolean,
		trainer: Trainer,
		boxed: TrainerPokemon[],
		tags: TagList,
		editable?: boolean,
		/** Lets the roster make room on narrow screens before the panel opens. */
		onexpand?: () => void,
		/**
		 * Resolves once the move has settled, either way. The roster owns the error
		 * reporting, so a rejection never reaches here.
		 */
		onwithdraw?: (id: PokemonId) => Promise<void>,
	} = $props()

	// Bound so closing the drawer can hand focus back to the control that opened
	// it, rather than dropping it on the body.
	let bar = $state<HTMLButtonElement | undefined>()
	// Deliberately not a shared store: the tag selection beside it is local too,
	// and a query typed for one trainer's box means nothing for the next.
	let filterValue = $state("")
	// The Box's own tag selection and All/Any mode. Separate variables from the
	// party's, bound to a separate TagSelection, so the two panels filter
	// independently -- changing one cannot move the other.
	let filteredTags = $state<string[]>([])
	let filterTagMode = $state<TagSelectionMode>(DefaultTagSelectionMode)
	// Set while a withdrawal is in flight, which disables every row's button, not
	// just the one clicked. The rows are about to be re-rendered without that
	// pokemon anyway, so there is nothing to gain from being finer grained.
	let withdrawing = $state<PokemonId | undefined>(undefined)

	// Same filter the party uses, so a tag or a nickname behaves identically in
	// both lists. `tags` is every tag on the roster, not just the box's.
	const filtered = $derived(boxed.filter(matchesPokemonFilter(filterValue, filteredTags, filterTagMode, tags)))

	const toggle = () => {
		open = !open

		if (open) onexpand?.()
	}

	const close = () => {
		open = false
		bar?.focus()
	}

	const withdraw = (id: PokemonId) => async () => {
		withdrawing = id
		try {
			await onwithdraw?.(id)
		} finally {
			withdrawing = undefined
		}
	}

	const resetFilters = () => {
		filteredTags = []
		filterTagMode = DefaultTagSelectionMode
	}

	const onkeydown = (e: KeyboardEvent) => {
		if (e.key === "Escape" && open) {
			// Scoped to the drawer so it cannot steal Escape from the site nav.
			e.stopPropagation()
			close()
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- Escape has to be caught for the whole drawer, so the handler sits on the
     wrapper and lets keydown bubble to it from the bar and the panel alike. A
     single listener here beats duplicating it onto both.

     The bar is a heading wrapping a button, and the panel is a region labelled
     by that button -- the standard disclosure shape, so the drawer shows up in
     the heading outline and the panel inherits the bar's "Box <count>" name. -->
<section class="box-drawer" class:open role="group" {onkeydown}>
	<h3 class="bar-heading">
		<button
			bind:this={bar}
			id={BAR_ID}
			type="button"
			class="bar"
			aria-expanded={open}
			aria-controls={PANEL_ID}
			onclick={toggle}
		>
			<span class="bar-bar">
				<span class="bar-icon"><span class="bar-glyph"><ChevronIcon.Up label="" /></span></span>
				<span class="bar-label">{m["trainers.box"]()}</span>
				<span class="bar-count"><span class="unskew">{boxed.length}</span></span>
			</span>
		</button>
	</h3>
	<div id={PANEL_ID} class="panel" role="region" aria-labelledby={BAR_ID}>
		<SearchField
			id="filter-box"
			label={m["trainers.searchBox"]()}
			bind:value={filterValue}
			matched={filtered.length}
			max={boxed.length}
			activeFilters={filteredTags.length > 0 ? 1 : 0}
			on:reset={resetFilters}
		>
			<TagSelection bind:checked={filteredTags} bind:mode={filterTagMode} {tags} />
		</SearchField>
		<!-- An empty list has two causes worth telling apart: nothing is stored, or
		     the filter hid everything. -->
		{#if filtered.length === 0}
			<p class="empty">
				{boxed.length === 0 ? m["trainers.boxIsEmpty"]() : m["trainers.noBoxMatches"]()}
			</p>
		{:else}
			<ul class="box-list nolist">
				{#each filtered as p (p.id)}
					<li class="box-row">
						<PokemonSummary trainer={trainer.readKey} pokemon={p}>
							<span slot="actions" class="row-actions">
								{#if editable}
									<!-- Withdrawing is reversible by the button next to it, so it
									     acts straight away rather than through a confirmation
									     card. Releasing is not, so that one still asks. -->
									<button
										type="button"
										class="row-action"
										title={m["trainers.withdrawPokemon"]({ name: p.nickname })}
										aria-label={m["trainers.withdrawPokemon"]({ name: p.nickname })}
										disabled={withdrawing != null}
										onclick={withdraw(p.id)}
									><ChevronIcon.Up label="" /></button>
									<a
										class="row-action danger"
										href={Url.trainers(trainer.readKey, p.id, PageAction.removePokemon)}
										title={m["trainers.releasePokemon"]({ name: p.nickname })}
										aria-label={m["trainers.releasePokemon"]({ name: p.nickname })}
									><span aria-hidden="true">&times;</span></a>
								{/if}
							</span>
						</PokemonSummary>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
	.box-drawer {
		position: absolute;
		inset-inline: 0;
		/* Bleeds over the side column's padding so the bar hugs the panel edge. */
		inset-block-end: -0.5em;
		/* Below SearchField's own filter drawer, which is z-index 2, so the
		   party's filter panel still wins if the two ever meet. */
		z-index: 1;

		display: flex;
		flex-direction: column;
		block-size: var(--box-bar-size);
		box-shadow: var(--elev-cirrus);
		transition: block-size 200ms ease-in-out;
	}

	.box-drawer.open {
		block-size: var(--box-open-size);
	}

	.bar-heading {
		margin: 0;
		font-size: inherit;
		font-weight: inherit;
	}

	/* Borrows the search field's chips -- skewed slabs of --skin-bg-dark at each
	   end of a --skin-bg bar -- but stays a rectangle. The bar sits directly on
	   top of the panel, so skewing the whole thing would run its slanted edge
	   across the panel's straight one. Overflow clips the chips' outer slants so
	   they finish flush against the bar's ends. */
	.bar {
		all: unset;
		box-sizing: border-box;
		flex: 0 0 auto;
		inline-size: 100%;
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		overflow: hidden;
		cursor: pointer;
	}

	.bar-bar {
		display: flex;
		align-items: stretch;
		block-size: var(--box-bar-size);
	}

	.bar:focus-visible .bar-bar {
		outline: 0.125em solid var(--skin-focus);
	}

	.bar-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--skin-bg-dark);
		transform: skewX(var(--skew-angle));
		/* Pushes the chip's outer slant past the bar's edge, to be clipped. */
		margin-inline-start: -0.75em;
		padding-inline: 1.75em 0.75em;
	}

	.bar:hover .bar-icon {
		background-color: var(--skin-bg);
	}

	.bar-glyph {
		display: flex;
		inline-size: 1em;
		transform: skewX(var(--skew-undo));
		transition: rotate 200ms ease-in-out;
	}

	.box-drawer.open .bar-glyph {
		rotate: 180deg;
	}

	.bar-label {
		flex: 1;
		display: flex;
		align-items: center;
		text-align: start;
		padding-inline-start: 0.75em;
	}

	.bar-count {
		display: flex;
		align-items: center;
		background-color: var(--skin-bg-dark);
		transform: skewX(var(--skew-angle));
		padding: 0 1.75em 0 0.75em;
		margin-inline-start: 0.5em;
		margin-inline-end: -0.75em;
		color: var(--skin-bg-softtext);
		white-space: nowrap;
	}

	.unskew {
		display: block;
		/* Matches the chevron's width, so a one-digit count does not make this
		   chip visibly narrower than the one at the other end. */
		min-inline-size: 1em;
		text-align: center;
		transform: skewX(var(--skew-undo));
	}

	.panel {
		flex: 1;
		min-block-size: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em 0.5em 1em;
		background: var(--skin-bg-light);
		/* Clips its own contents mid-collapse, so the bar above is free to let
		   its skewed ends overhang the way the search field's do. */
		overflow: hidden;

		/* Takes the closed contents out of the tab order and the a11y tree, while
		   still letting block-size animate. Delayed so it survives the collapse. */
		visibility: hidden;
		transition: visibility 0s 200ms;
	}

	.box-drawer.open .panel {
		visibility: visible;
		transition: visibility 0s 0s;
	}

	.box-list {
		flex: 1;
		min-block-size: 0;
		overflow-y: auto;
		margin: 0;
		padding: 0;

		/* No drag handles in the box, so the badges get the rest of the row
		   instead of stopping at the party's 75%. */
		--pokemon-summary-max-inline-size: 100%;
	}

	.box-row {
		margin-block-end: 0.5em;
	}

	.empty {
		color: var(--skin-bg-text);
		font-size: var(--font-sz-venus);
		margin: 0 0.5em;
	}

	.row-actions {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.row-action {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.75em;
		block-size: 1.75em;
		flex: 0 0 auto;
		border-radius: 100%;
		color: var(--skin-bg-text);
		text-decoration: none;
		cursor: pointer;
	}

	.row-action:hover, .row-action:focus-visible {
		background: var(--skin-bg-dark);
	}

	.row-action:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.row-action.danger {
		color: var(--red-light);
		font-size: var(--font-sz-neptune);
		line-height: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.box-drawer, .bar-glyph {
			transition: none;
		}

		.panel {
			transition-delay: 0s;
		}
	}
</style>
