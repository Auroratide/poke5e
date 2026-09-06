<script lang="ts">
	import { Page } from "$lib/ui/layout"
	import MoveList from "$lib/moves/MoveList.svelte"
	import { HitIcon } from "$lib/ui/icons"
	import { Loader } from "$lib/ui/elements"
	import { MovesStore } from "$lib/moves/store"
	import { MoveListing } from "$lib/moves/MoveListing"
	import { ListPageHeading } from "$lib/ui/page"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { page } from "$app/state"
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children: Snippet,
	} = $props()

	const ssrMoves = $derived(page.data.movesList?.map(MoveListing.fromJson))
	const movesToRender = $derived($MovesStore.result ?? ssrMoves)
</script>

<Page theme="blue">
	<HitIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Move List">
		<ListPageHeading title="Move List" target="/moves" />
		{#if movesToRender !== undefined}
			<MoveList moves={movesToRender} />
		{:else}
			<Loader />
		{/if}
	</nav>
	{@render children?.()}
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
