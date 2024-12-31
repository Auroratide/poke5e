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
	import ErrorDialog from "$lib/design/errors/ErrorDialog.svelte"
	import { currentVersion } from "./version-history/versions"
	import MigrationDialog from "$lib/trainers/migration/MigrationDialog.svelte"
	import { browser } from "$app/environment"
	import { MY_ORIGIN } from "$lib/trainers/migration/origins"

	export let data: LayoutData
	$: activeSection = data.activeSection

	export let resetStores = (filter: Writable<string>, sorter: Writable<() => number>) => () => {
		filter.set("")
		sorter.set(() => 0)
	}

	afterNavigate((navigation) => {
		Analytics.createPageviewEvent(navigation.to.url.pathname)
	})
</script>

<div class="page">
	<header>
		<Container>
			<nav aria-label="Site Navigation">
				<ul>
					<li class:active={activeSection === "pokemon"} class="theme-red">
						<a href="{base}/pokemon" on:click={resetStores(pokemonFilter, pokemonSorter)}>Pokemon</a>
					</li>
					<li class:active={activeSection === "moves"} class="theme-blue">
						<a href="{base}/moves" on:click={resetStores(movesFilter, movesSorter)}>Moves</a>
					</li>
					<li class:active={activeSection === "tms"} class="theme-purple">
						<a href="{base}/tms" on:click={resetStores(tmsFilter, tmsSorter)}>TMs</a>
					</li>
					<li class:active={activeSection === "trainers"} class="theme-green">
						<a href="{base}/trainers" on:click={resetStores(trainerListFilterValue, trainerListSorter)}>Trainers</a>
					</li>
				</ul>
			</nav>
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

	nav {
		text-align: right;
		padding: 0.25em 0;
	}

	nav ul {
		position: relative;
		list-style: none;
		padding: 0;
		margin: 0;
		display: inline-flex;
		padding: 0 2em;
	}

	nav ul::before {
		content: '';
		position: absolute;
		top: 0;
		right: -1000rem;
		left: 0;
		bottom: 0;
		background: var(--skin-bg);
		z-index: 1;
		transform: skewX(var(--skew-angle));
	}

	nav li {
		position: relative;
		z-index: 2;
	}

	nav a {
		color: var(--skin-bg-softtext);
		text-decoration: none;
		display: inline-block;
		padding: 0.25em 1em;

		&:hover {
				color: var(--theme-light);
		}
	}

	nav .active a {
		color: var(--skin-bg-text);
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