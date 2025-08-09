<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import Greatball from "$lib/design/icon/Greatball.svelte"
	import Page from "$lib/design/Page.svelte"
	import { MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"
	import Title from "$lib/design/Title.svelte"
	import { FakemonCard, FakemonEditor, PageAction } from "$lib/fakemon/page"

	// $: fakemonId = browser ? $page.url.searchParams.get("id") : undefined
	$: action = browser ? $page.url.searchParams.get("action") : undefined
</script>

<Title value="Fakémon" />
<Page theme="red">
	<Greatball slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Fakémon List">
		<p>Nav</p>
	</nav>
	{#if action === PageAction.edit}
		<FakemonEditor />
	{:else}
		<FakemonCard />
	{/if}
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
