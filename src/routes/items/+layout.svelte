<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import Backpack from "$lib/design/icon/Backpack.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { items } from "$lib/items/store"
	import ItemList from "$lib/items/ItemList.svelte"

	$: ssrItems = $page.data.itemList
	$: itemsToRender = ssrItems ?? $items
</script>

<Page theme="yellow">
	<Backpack slot="icon" />
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
