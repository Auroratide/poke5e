<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { BackpackIcon } from "$lib/ui/icons"
	import { Loader } from "$lib/ui/elements"
	import { ListPageHeading } from "$lib/ui/page"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { ItemList, ItemStore } from "$lib/items"

	$: ssrItems = $page.data.itemsList
	$: itemsToRender = ssrItems ?? $ItemStore
</script>

<Page theme="yellow">
	<BackpackIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Item List">
		<ListPageHeading title="Item List" target="/items" />
		{#if itemsToRender !== undefined}
			<ItemList items={itemsToRender} />
		{:else}
			<Loader />
		{/if}
	</nav>
	<slot></slot>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
