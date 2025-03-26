<script lang="ts">
	import type { LayoutData } from "./$types"
	import type { Writable } from "svelte/store"
	import Container from "$lib/design/Container.svelte"
	import { base } from "$app/paths"
	import { afterNavigate } from "$app/navigation"
	import * as Analytics from "$lib/analytics"
	import { filterValue as pokemonFilter, currentSorter as pokemonSorter } from "$lib/creatures/store"
	import {
		filterValue as movesFilter,
		currentSorter as movesSorter,
		filterTmValue as tmsFilter,
		currentTmSorter as tmsSorter,
	} from "$lib/moves/store"
	import {
		trainerListFilterValue,
		trainerListSorter,
	} from "$lib/trainers/store"
	import { filterValue as referenceFilter } from "./reference/store"
	import ErrorDialog from "$lib/design/errors/ErrorDialog.svelte"
	import { currentVersion } from "./version-history/versions"
	import MigrationDialog from "$lib/trainers/migration/MigrationDialog.svelte"
	import { browser } from "$app/environment"
	import { MY_ORIGIN } from "$lib/trainers/migration/origins"
	import MainNavigation from "$lib/design/MainNavigation.svelte"
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import IdBadge from "$lib/design/icon/IdBadge.svelte"
	import PencilNotes from "$lib/design/icon/PencilNotes.svelte"
	import Backpack from "$lib/design/icon/Backpack.svelte"
	
	if (browser) {
		import("@auroratide/toggle-switch/lib/define.js")
	}

	export let data: LayoutData
	$: activeSection = data.activeSection

	export let resetStores = (filter?: Writable<string>, sorter?: Writable<() => number>) => () => {
		filter?.set("")
		sorter?.set(() => 0)
	}

	afterNavigate((navigation) => {
		if (navigation.from?.url.pathname.split("/")[1] !== navigation.to?.url.pathname.split("/")[1]) {
			resetStores(pokemonFilter, pokemonSorter)()
			resetStores(movesFilter, movesSorter)()
			resetStores(tmsFilter, tmsSorter)()
			resetStores(trainerListFilterValue, trainerListSorter)()
			resetStores(referenceFilter, undefined)()
		}

		if (navigation.to) {
			Analytics.createPageviewEvent(navigation.to.url.pathname)
		}
	})
</script>

<div class="page">
	<header>
		<Container>
			<MainNavigation active={activeSection} items={[ {
				id: "pokemon",
				name: "Pokémon",
				color: "red",
				icon: Pokeball,
			}, {
				id: "moves",
				name: "Moves",
				color: "blue",
				icon: Hit,
			}, {
				id: "tms",
				name: "TMs",
				color: "purple",
				icon: Disc,
			}, {
				id: "items",
				name: "Items",
				color: "yellow",
				icon: Backpack,
			}, {
				id: "trainers",
				name: "Trainers",
				color: "green",
				icon: IdBadge,
			}, {
				id: "reference",
				name: "Reference",
				color: "navy",
				icon: PencilNotes,
			} ]} />
		</Container>
	</header>
	<div class="content">
		<slot></slot>
	</div>
	<footer>
		<Container>
			<div class="horizontal-between footer-links">
				<p><a href="{base}/version-history">{currentVersion}</a></p>
				<p><a href="{base}/feedback">Got feedback?</a></p>
			</div>
			<p class="license"><small>This is unofficial Fan Content and is not approved/endorsed by &copy; Wizards of the Coast, &copy; Game Freak, or &copy; Nintendo Company Inc. Portions of the material may be property of &copy; Wizards of the Coast, &copy; Game Freak, or &copy; Nintendo Company Inc.</small></p>
		</Container>
	</footer>
	<ErrorDialog />
	{#if browser && window.location.origin === MY_ORIGIN}
		<MigrationDialog />
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}

	.content {
		flex: 1;
		overflow: hidden;
	}

	footer {
		background: var(--skin-footer);
		color: var(--skin-footer-text);
	}

	.license {
		text-align: center;
		margin: 0;
		font-size: var(--font-sz-mercury);
	}

	.horizontal-between {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.footer-links {
		font-size: var(--font-sz-mars);
		padding: 0.25em 0.5em;
	} .footer-links p {
		margin: 0;
	}
</style>