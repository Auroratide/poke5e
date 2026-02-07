<script lang="ts">
	import "$lib/ui/theme"
	import type { LayoutData } from "./$types"
	import type { Writable } from "svelte/store"
	import { afterNavigate } from "$app/navigation"
	import * as Analytics from "$lib/site/analytics"
	import {
		pokemonFilter,
		pokemonSorter,
	} from "$lib/site/stores"
	import {
		MovesFilterStore as movesFilter,
		MovesSorterStore as movesSorter,
		TmsFilterStore as tmsFilter,
		TmsSorterStore as tmsSorter,
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
		CogIcon,
		DiscIcon,
		GreatballIcon,
		HitIcon,
		IdBadgeIcon,
		PencilNotesIcon,
		PokeballIcon,
		BackupIcon,
		VsIcon,
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
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"
	
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
		href: string,
		name: string,
		color: ThemeColor,
		icon: ComponentType,
	}[] = [ {
		id: "pokemon",
		href: Url.pokemon(),
		name: m["pokemon.title"](),
		color: "red",
		icon: PokeballIcon,
	}, {
		id: "moves",
		href: Url.moves(),
		name: m["moves.title"](),
		color: "blue",
		icon: HitIcon,
	}, {
		id: "tms",
		href: Url.tms(),
		name: m["tms.title"](),
		color: "purple",
		icon: DiscIcon,
	}, {
		id: "items",
		href: Url.items(),
		name: m["items.title"](),
		color: "yellow",
		icon: BackpackIcon,
	}, {
		id: "trainers",
		href: Url.trainers(),
		name: m["trainers.title"](),
		color: "green",
		icon: IdBadgeIcon,
	}, {
		id: "reference",
		href: Url.reference.all(),
		name: m["reference.title"](),
		color: "navy",
		icon: PencilNotesIcon,
	}, {
		id: "fakemon",
		href: Url.fakemon(),
		name: m["fakemon.title"](),
		color: "pink",
		icon: GreatballIcon,
	}, {
		id: "encounter-tool",
		href: Url.encounterTool(),
		name: m["encounterTool.title"](),
		color: "forest",
		icon: VsIcon,
  }, {
		id: "backups",
		href: Url.backups.home(),
		name: m["backups.title"](),
		color: "grey",
		icon: BackupIcon,
	}, {
		id: "settings",
		href: Url.settings(),
		name: m["settings.title"](),
		color: "grey",
		icon: CogIcon,
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