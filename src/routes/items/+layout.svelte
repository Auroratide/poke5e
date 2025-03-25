<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { items } from "$lib/items/store"
	import ItemList from "$lib/items/ItemList.svelte"

	$: ssrItems = $page.data.itemList
	$: itemsToRender = ssrItems ?? $items
</script>

<Page theme="yellow">
	<Hit slot="icon" />
	<nav slot="side" class="table" aria-label="Item List">
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
