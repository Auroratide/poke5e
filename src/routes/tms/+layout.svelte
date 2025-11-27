<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import TmList from "$lib/moves/TmList.svelte"
	import { DiscIcon } from "$lib/ui/icons"
	import Loader from "$lib/design/Loader.svelte"
	import { tms } from "$lib/moves/store"
	import ListPageHeading from "$lib/design/ListPageHeading.svelte"
	import { MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"

	$: ssrTms = $page.data.tmsList
	$: tmsToRender = ssrTms ?? $tms
</script>

<Page theme="purple">
	<DiscIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" aria-label="TM List">
		<ListPageHeading title="TM List" target="/tms" />
		{#if tmsToRender !== undefined}
			<TmList tms={tmsToRender} />
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
