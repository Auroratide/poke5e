<script lang="ts">
	import { Page } from "$lib/ui/layout"
	import { PencilNotesIcon } from "$lib/ui/icons"
	import { page } from "$app/state"
	import { SearchField } from "$lib/ui/forms"
	import { filterValue } from "./store"
	import { search, Preamble, CoreRules, Appendix, Supplements } from "./references"
	import { ListPageHeading } from "$lib/ui/page"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children?: Snippet,
	} = $props()

	let listsElem: HTMLElement
	let pathname = $derived(page.url.pathname)
	// This manual DOM update is here because, for reasons I can't ascertain, Svelte is
	// not updating anything inside the side slot reactively. So I'll do it myself.
	$effect(() => {
		listsElem?.querySelectorAll("a").forEach((a) => {
			a.classList.toggle("active", pathname.startsWith(a.dataset.pathname ?? ""))
		})
	})

	let filteredCoreRules = $derived(search($CoreRules, $filterValue))
	let filteredAppendix = $derived(search($Appendix, $filterValue))
	let filteredSupplements = $derived(search($Supplements, $filterValue))
	let totalCount = $derived($CoreRules.length + $Appendix.length + $Supplements.length)
	let filteredCount = $derived(filteredCoreRules.length + filteredAppendix.length + filteredSupplements.length)
</script>

<Page theme="navy">
	<PencilNotesIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" aria-label="Reference" data-pathname="{pathname}">
		<ListPageHeading title="Reference" target="/reference" />
		<SearchField id="reference-search" label="Search" bind:value={$filterValue} matched={filteredCount} max={totalCount} />
		<div class="lists-container" bind:this={listsElem}>
			{#each [Preamble, filteredCoreRules, filteredAppendix, filteredSupplements] as chapter}
				<ul>
					{#each chapter as reference (reference.name)}
						<li><a href="{reference.url}" data-pathname="{reference.url}">{reference.name}</a></li>
					{/each}
				</ul>
			{/each}
		</div>
	</nav>
	{@render children?.()}
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1em;
	}

	.lists-container {
		overflow: auto;
		inline-size: 100%;
	}

	ul {
		list-style: none;
		padding: 0;
		inline-size: 100%;
		margin: 0 0 1.5em 0;
	} ul li {
		display: block;
		margin-inline: 0.5em;
		margin-block-end: 0.25em;
	} ul li:first-child {
		font-size: var(--font-sz-neptune);
		margin-inline: 0;
	}

	a {
		display: block;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		text-decoration: none;
		border-radius: 1em;
		padding: 0.125em 1em;
		box-shadow: var(--elev-cumulus);
	} a:hover:not(.active), a:focus:not(.active) {
		background: var(--skin-content);
		color: var(--skin-content-text);
	} a:global(.active) {
		font-weight: bold;
	} a:global(.active):hover, a:global(.active):focus {
		background: var(--skin-bg-dark);
	}
</style>
