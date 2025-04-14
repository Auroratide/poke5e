<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import Backpack from "$lib/design/icon/Backpack.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { items } from "$lib/items/store"
	import ItemList from "$lib/items/ItemList.svelte"
	import ListPageHeading from "$lib/design/ListPageHeading.svelte"
	import { MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"

	$: ssrItems = $page.data.itemsList
	$: itemsToRender = ssrItems ?? $items
</script>

<Page theme="yellow">
	<Backpack slot="icon" />
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
