<script lang="ts">
	import { Page } from "$lib/ui/layout"
	import { PencilNotesIcon } from "$lib/ui/icons"
	import { page } from "$app/stores"
	import SearchField from "$lib/design/SearchField.svelte"
	import { filterValue } from "./store"
	import { search, References } from "./references"
	import ListPageHeading from "$lib/design/ListPageHeading.svelte"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"

	$: pathname = $page.url.pathname

	// This manual DOM update is here because, for reasons I can't ascertain, Svelte is
	// not updating anything inside the side slot reactively. So I'll do it myself.
	let ul: HTMLUListElement
	$: {
		ul?.querySelectorAll("a").forEach((a) => {
			a.classList.toggle("active", pathname.startsWith(a.dataset.pathname))
		})
	}

	$: filtered = search($filterValue)
</script>

<Page theme="navy">
	<PencilNotesIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" aria-label="Reference" data-pathname="{pathname}">
		<ListPageHeading title="Reference" target="/reference" />
		<SearchField id="reference-search" label="Search" bind:value={$filterValue} matched={filtered.length} max={References.length} />
		<ul bind:this={ul}>
			{#each filtered as reference (reference.name)}
				<li><a href="{reference.url}" data-pathname="{reference.url}">{reference.name}</a></li>
			{/each}
		</ul>
	</nav>
	<slot></slot>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1em;
	}

	ul {
		list-style: none;
		padding: 0;
		inline-size: 100%;
		overflow: auto;
		margin: 0;
	} ul li {
		display: block;
		margin-block-end: 0.25em;
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
