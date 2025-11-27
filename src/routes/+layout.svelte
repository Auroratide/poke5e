<script lang="ts">
	import "$lib/ui/theme"
	import type { LayoutData } from "./$types"
	import type { Writable } from "svelte/store"
	import { afterNavigate } from "$app/navigation"
	import * as Analytics from "$lib/site/analytics"
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
	import { ErrorDialog } from "$lib/site/errors"
	import { currentHighlight, currentVersion } from "./version-history/versions"
	import { browser } from "$app/environment"
	import {
		BackpackIcon,
		DiscIcon,
		GreatballIcon,
		HitIcon,
		IdBadgeIcon,
		PencilNotesIcon,
		PokeballIcon,
	} from "$lib/ui/icons"
	import { page } from "$app/stores"
	import type { ComponentType } from "svelte"
	import {
		Container,
		MainNavigation,
		SiteFooter,
		SkipLinks,
		MAIN_CONTENT_ID,
		MAIN_SEARCH_ID,
	} from "$lib/ui/layout"
	import type { ThemeColor } from "$lib/ui/theme"
	
	if (browser) {
		import("@auroratide/toggle-switch/lib/define.js")
		import("@auroratide/tab-list/lib/define.js")
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
		icon: PokeballIcon,
	}, {
		id: "moves",
		name: "Moves",
		color: "blue",
		icon: HitIcon,
	}, {
		id: "tms",
		name: "TMs",
		color: "purple",
		icon: DiscIcon,
	}, {
		id: "items",
		name: "Items",
		color: "yellow",
		icon: BackpackIcon,
	}, {
		id: "trainers",
		name: "Trainers",
		color: "green",
		icon: IdBadgeIcon,
	}, {
		id: "reference",
		name: "Reference",
		color: "navy",
		icon: PencilNotesIcon,
	}, {
		id: "fakemon",
		name: "Fakémon",
		color: "pink",
		icon: GreatballIcon,
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
		height: 100dvh;
		overflow: hidden;
	}

	.content {
		flex: 1;
		overflow: hidden;
	}
</style>