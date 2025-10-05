<script lang="ts">
	import type { LayoutData } from "./$types"
	import type { Writable } from "svelte/store"
	import Container from "$lib/design/Container.svelte"
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
	import { currentHighlight, currentVersion } from "./version-history/versions"
	import { browser } from "$app/environment"
	import MainNavigation from "$lib/design/MainNavigation.svelte"
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import IdBadge from "$lib/design/icon/IdBadge.svelte"
	import PencilNotes from "$lib/design/icon/PencilNotes.svelte"
	import Backpack from "$lib/design/icon/Backpack.svelte"
	import SiteFooter from "$lib/design/SiteFooter.svelte"
	import SkipLinks, { MAIN_CONTENT_ID, MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"
	import { page } from "$app/stores"
	import Greatball from "$lib/design/icon/Greatball.svelte"
	import type { ThemeColor } from "$lib/design/Theme.svelte"
	import type { ComponentType } from "svelte"
	
	if (browser) {
		import("@auroratide/toggle-switch/lib/define.js")
	}

	export let data: LayoutData
	$: activeSection = data.activeSection

	export let resetStores = (filter?: Writable<string>, sorter?: Writable<() => number>) => () => {
		filter?.set("")
		sorter?.set(() => 0)
	}

	// Deactivated due to major performance issues on mobile and Safari; needs to be revisited
	// initializeTransitions()

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

	// Sort of an abusive way to make sure this is always right
	$: hasContent = browser && $page.url != null ? (document.querySelector(`#${MAIN_CONTENT_ID}`)?.textContent?.length ?? 0) > 0 : false
	$: hasSearch = browser && $page.url != null ? (document.querySelector(`#${MAIN_SEARCH_ID}`)?.textContent?.length ?? 0) > 0 : false

	const navItems: {
		id: string,
		name: string,
		color: ThemeColor,
		icon: ComponentType,
	}[] = [ {
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
	}, {
		id: "fakemon",
		name: "Fakémon",
		color: "pink",
		icon: Greatball,
	} ]
</script>

<div class="page">
	<SkipLinks content={hasContent} search={hasSearch} />
	<header>
		<Container>
			<MainNavigation active={activeSection} items={navItems} />
		</Container>
	</header>
	<div class="content">
		<slot></slot>
	</div>
	<SiteFooter {currentVersion} versionHighlight={currentHighlight} />
	<ErrorDialog />
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
</style>